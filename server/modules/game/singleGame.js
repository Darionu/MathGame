import QueueManager from '../queue';
import Logger from '/lib/logging/Logger';
import ReadyCheck from './readyCheck';
import GameProtocol from './gameProtocol';
import { Games, Exercises } from '/lib/collections';
import ExerciseGenerator from '/server/modules/exerciseGenerator';
import { GameStatuses, GamePointsConstants } from '/lib/constants/gameConstants';
import moment from 'moment';

/**
 * SingleGame
 *
 * Instance of a single game between two players.
 */
export default class {
    constructor(playerOne, playerTwo, gameType) {
        this.playerOne = playerOne;
        this.playerTwo = playerTwo;
        this.gameType = gameType;
        this._protocol = GameProtocol.getProtocol();
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
        Logger.info(`[SingleGame] Initialization for players ${this.playerOne.username}(${this.playerOne._id}) & ${this.playerTwo.username}(${this.playerTwo._id})`, __dirname);
        QueueManager.stopQueue(this.playerOne._id, this.playerTwo._id);
        const readyCheck = new ReadyCheck(this.playerOne, this.playerTwo);
        readyCheck.performReadyCheck().then(() => {
            this.createGame();
        });
    }

    /**
     * Start the game by putting it's record in the database and
     * starting first round.
     * @public
     */
    createGame() {
        Logger.info(`[SingleGame] Game manager initialization for players ${this.playerOne.username}(${this.playerOne._id}) & ${this.playerTwo.username}(${this.playerTwo._id})`, __dirname);
        this.gameId = Games.insert({
            type: this.gameType,
            playerA: {
                id: this.playerOne._id
            },
            playerB: {
                id: this.playerTwo._id
            }
        });

        if (this.gameId) {
            this.startNewRound();
        } else {
            Logger.error(`[SingleGame] Encountered error during inserting game to the database.`, __dirname);
            // TODO: Put players back to the queue.
        }
    }

    /**
     * Finishes the game and sets the winner id.
     * @param {string} winnerId - _id of a player who won the game.
     * @public
     */
    finishGame(winnerId) {
        Logger.info(`[SingleGame] Finishing game. Winner of the game is ${winnerId}`, __dirname);
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
     * Adding an answer from a specific player to the exercise.
     * @param {string} playerId - player which made an answer.
     * @param {number} answer - chosen answer.
     * @param {Date} answerDate - date of answer.
     * @public
     */
    addAnswer(playerId, answer, answerDate) {
        const game = Games.findOne(this.gameId);
        const currentExercise = _.last(game.exercises);
        const playerType = game.playerA.id === playerId
            ? 'playerA'
            : 'playerB';

        const exercise = Exercises.findOne(currentExercise);
        if (exercise[playerType].answer){
            Logger.warn('Player already answered to the question', __dirname);
            return;
        }

        const query = game.playerA.id === playerId
            ? {
                'playerA.answer': answer,
                'playerA.answerDate': answerDate
            }
            : {
                'playerB.answer': answer,
                'playerB.answerDate': answerDate
            };


        const result = Exercises.update(currentExercise, { $set: query});
        this.checkIfProcessCurrentTurn();

        if (result === 1) {
            return exercise.correctAnswer === answer;
        } else {
            return result;
        }
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
                Logger.warn(`[SingleGame] Encountered error during creating exercise: ${error}`, __dirname);
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
            Logger.info('[SingleGame] Creating ExerciseGenerator', __dirname);
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

        if (currentExercise && currentExercise.playerA.answer && currentExercise.playerB.answer) {
            // TODO: Send to players opponent answer // points difference
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
            Logger.info(`[SingleGame] Adding ${points} points to player A (${this.playerOne})`, __dirname);
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
        if (!game) {
            Logger.error(`[SingleGame] Couldn't calculate points because game object is undefined.`, __dirname);
            return;
        }

        if (game.playerA.points >= GamePointsConstants.winRequirement ||
            game.playerB.points >= GamePointsConstants.winRequirement) {
            const winner = this.getWinnerId(game.playerA, game.playerB);
            this.finishGame(winner);
        } else {
            Logger.info(`[SingleGame] Starting new round of the game ${this.gameId}.`, __dirname);
            this.startNewRound();
        }
    }

    /**
     *  Returns id of player which has the most points.
     *  @param {Object} playerA
     *  @param {Object} playerB
     *  @returns {String} result = winnerId or DRAW
     */
    getWinnerId(playerA, playerB) {
        if (playerA.points > playerB.points) {
            Logger.info(`[SingleGame] Player A (${playerA.id}) won the game.`, __dirname);
            return playerA.id;
        } else if (playerA.points < playerB.points) {
            Logger.info(`[SingleGame] Player B (${playerB.id}) won the game.`, __dirname);
            return playerB.id;
        }

        return 'DRAW';
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
