import QueueManager from '../queue';
import Logger from '/lib/logging/Logger';
import { Games, Exercises } from '/lib/collections';
import ExerciseGenerator from '/server/modules/exerciseGenerator';
import { GameStatuses, GamePointsConstants } from '/lib/constants/gameConstants';
import moment from 'moment';
import OpponentTypes from '/lib/constants/opponentTypes';

/**
 * SingleGameBot
 *
 * Instance of a single game between player and bot.
 */
export default class {
    constructor(player, gameType) {
        this.player = player;
        this.gameType = gameType;
        this.gameId = null;
        this.gameFinished = false;

        this.roundNumber = 0;
        this.roundTimeout = null;
        this.init();
    }

    /**
     * Logic to do at the class initialization.
     * Launch ready check mechanism and after it's promise start the game.
     * @private
     */
    init() {
        Logger.info(`[SingleGameBot] Initialization for player ${this.player.username}(${this.player._id}).`, __dirname);
        QueueManager.stopQueue(this.player._id, null);
        this.createGame();
    }

    /**
     * Start the game by putting it's record in the database and
     * starting first round.
     * @public
     */
    createGame() {
        Logger.info(`[SingleGameBot] Game manager initialization for player ${this.player.username}(${this.player._id})`, __dirname);
        this.gameId = Games.insert({
            type: this.gameType,
            playerA: {
                id: this.player._id
            },
            playerB: {
                id: OpponentTypes.bot
            }
        });

        if (this.gameId) {
            this.startNewRound();
        } else {
            Logger.error(`[SingleGameBot] Encountered error during inserting game to the database.`, __dirname);
            // TODO: Put players back to the queue.
        }
    }

    /**
     * Finishes the game and sets the winner id.
     * @param {string} winnerId - _id of a player who won the game.
     * @public
     */
    finishGame(winnerId) {
        Logger.info(`[SingleGameBot] Finishing game. Winner of the game is ${winnerId}`, __dirname);
        Meteor.clearTimeout(this.roundTimeout);
        this.gameFinished = true;
        return Games.update(this.gameId, {
            $set: {
                status: GameStatuses.finished,
                winnerId
            }
        });
    }

    /**
     * Adding an answer from a player to the exercise.
     * @param {string} playerId - player which made an answer.
     * @param {number} answer - chosen answer.
     * @param {Date} answerDate - date of answer.
     * @public
     */
    addAnswer(playerId, answer, answerDate) {
        const game = Games.findOne(this.gameId);
        const currentExercise = _.last(game.exercises);
        const exercise = Exercises.findOne(currentExercise);
        if (exercise.playerA.answer){
            Logger.warn('Player already answered to the question', __dirname);
            return;
        }

        const result = Exercises.update(currentExercise, {
            $set: {
                'playerA.answer': answer,
                'playerA.answerDate': answerDate
            }
        });

        this.generateBotAnswer(exercise);
        this.checkIfProcessCurrentTurn();

        if (result === 1) {
            return exercise.correctAnswer === answer;
        } else {
            return result;
        }
    }

    /**
     * Generates random answer and delay time for a bot player.
     * @param {object} exercise - current exercise.
     */
    generateBotAnswer(exercise) {
        const answerDate = new Date(exercise.date.getTime() + Math.floor((Math.random() * 15000) + 1));
        const rollValue = Math.floor((Math.random() * 10) + 1);
        const randomAnswer = Math.floor((Math.random() * 4));
        const botAnswer = (rollValue >= 4)
            ? exercise.correctAnswer
            : exercise.answers[randomAnswer];

        Exercises.update(exercise._id, {
            $set: {
                'playerB.answer': botAnswer,
                'playerB.answerDate': answerDate
            }
        });
    }

    /**
     * Start the game mechanism for a single new round.
     * @private
     */
    startNewRound() {
        Meteor.clearTimeout(this.roundTimeout);
        Meteor.setTimeout(() => {
            this.generateExercise().then(() => {
                this.bumpRound();
                this.setRoundTimeout();
            }).catch((error) => {
                Logger.warn(`[SingleGameBot] Encountered error during creating exercise: ${error}`, __dirname);
            });
        }, 500);
    }

    setRoundTimeout() {
        const roundNumber = this.roundNumber;
        this.roundTimeout = Meteor.setTimeout(() => {
            if (this.roundNumber === roundNumber) {
                const game = Games.findOne(this.gameId);
                const currentExerciseId = _.last(game.exercises);
                const currentExercise = Exercises.findOne(currentExerciseId);
                this.calculatePoints(currentExercise);
            }
        }, 20000);
    }

    /**
     * Increments round number by one.
     * @private
     */
    bumpRound() {
        Games.update(this.gameId, {
            $inc: {
                roundNumber: 1
            }
        });
        this.roundNumber += 1;
    }

    /**
     * Create instance of ExerciseGenerator to create a new exercise.
     * @private
     */
    generateExercise() {
        return new Promise((resolve, reject) => {
            Logger.info('[SingleGameBot] Creating ExerciseGenerator', __dirname);
            const exerciseGenerator = new ExerciseGenerator(this.gameType);
            const exerciseId = exerciseGenerator.init();
            if (exerciseId) {
                Games.update(this.gameId, {
                    $push: {
                        exercises: exerciseId
                    }
                });
                resolve();
            } else {
                reject();
            }
        });
    }

    /**
     * Checks if all the requirements for ending current turn are set.
     * If so then starts ends current turn and calculate points.
     * @private
     */
    checkIfProcessCurrentTurn() {
        const game = Games.findOne(this.gameId);
        const currentExerciseId = _.last(game.exercises);
        const currentExercise = Exercises.findOne(currentExerciseId);

        if (currentExercise && currentExercise.playerA.answer) {
            this.calculatePoints(currentExercise);
        }
    }

    /**
     * Handles adding points to a specific user if their answer were correctly.
     * Also checks if win conditions were met.
     * @param currentExercise - exercise which is currently in progress.
     * @private
     */
    calculatePoints(currentExercise) {
        if (currentExercise.playerA.answer === currentExercise.correctAnswer) {
            const difference =
                moment.duration(moment(currentExercise.playerA.answerDate).diff(moment(currentExercise.date)));
            const points = GamePointsConstants.exercisePoints - Math.floor(difference.asSeconds());
            Logger.info(`[SingleGameBot] Adding ${points} points to player A (${this.player.username})`, __dirname);
            this.addPoints("playerA.points", points > 0 ? points : 1);
        }

        if (currentExercise.playerB.answer === currentExercise.correctAnswer) {
            const difference =
                moment.duration(moment(currentExercise.playerB.answerDate).diff(moment(currentExercise.date)));
            const points = GamePointsConstants.exercisePoints - Math.floor(difference.asSeconds());
            Logger.info(`[SingleGame] Adding ${points} points to player B (${this.playerTwo})`, __dirname);
            this.addPoints("playerB.points", points > 0 ? points : 1);
        }

        const game = Games.findOne(this.gameId);
        if (game) {
            if (game.playerA.points >= GamePointsConstants.winRequirement &&
                game.playerB.points >= GamePointsConstants.winRequirement) {
                this.finishGame("DRAW");
                Logger.info(`[SingleGameBot] Game ended with draw.`, __dirname);
            } else if (game.playerA.points >= GamePointsConstants.winRequirement) {
                this.finishGame(game.playerA.id);
                Logger.info(`[SingleGameBot] Player A (${game.playerA.id}) won the game.`, __dirname);
            } else if (game.playerB.points >= GamePointsConstants.winRequirement) {
                this.finishGame(game.playerB.id);
                Logger.info(`[SingleGameBot] Player B (${game.playerB.id}) won the game.`, __dirname);
            } else {
                Logger.info(`[SingleGameBot] Starting new round of the game ${this.gameId}.`, __dirname);
                this.startNewRound();
            }
        } else {
            Logger.error(`[SingleGameBot] Couldn't calculate points because game object is undefined.`, __dirname);
        }
    }

    /**
     * Add provided points to a specific player from this game.
     * @param field - field of a player to add points.
     * @param points - amount of points to add to a player.
     * @private
     */
    addPoints(field, points) {
        Games.update(this.gameId, {
            $inc: {
                [field]: points
            }
        })
    }
};
