import QueueManager from '../queue';
import Logger from '/lib/logging/Logger';
import ReadyCheck from './readyCheck';
import GameProtocol from './gameProtocol';
import { Games, Exercises } from '/lib/collections';
import ExerciseGenerator from '/server/modules/exerciseGenerator';
import { GameStatuses, GamePointsConstants } from '/lib/constants/gameConstants';

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
            // TODO: Put users back to the queue.
        }
    }

    /**
     * Finishes the game and sets the winner id.
     * @param {string} winnerId - _id of a player who won the game.
     * @public
     */
    finishGame(winnerId) {
        Logger.info(`[SingleGame] Finishing game. Winner of the game is ${winnerId}`, __dirname);
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
     * @param playerId - player which made an answer.
     * @param answer - chosen answer.
     * @public
     */
    addAnswer(playerId, answer) {
        const game = Games.findOne(this.gameId);
        const currentExercise = _.last(game.exercises);
        const playerType = game.playerA.id === playerId
            ? 'playerAChoice'
            : 'playerBChoice';

        const exercise = Exercises.findOne(currentExercise);
        if (exercise[playerType]){
            Logger.warn('Player already answered to the question', __dirname);
            return;
        }

        const result = Exercises.update(currentExercise, {
            $set: {
                [playerType]: answer
            }
        });

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
        Meteor.setTimeout(() => {
            this.generateExercise().then(() => {
                this.bumpRound();
            }).catch((error) => {
                Logger.warn(`[SingleGame] Encountered error during creating exercise: ${error}`, __dirname);
            });
        }, 500);
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

        if (currentExercise && currentExercise.playerAChoice && currentExercise.playerBChoice) {
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
        if (currentExercise.playerAChoice === currentExercise.correctAnswer) {
            Logger.info(`[SingleGame] Adding 10 points to player A (${this.playerOne})`, __dirname);
            this.addPoints("playerA.points", GamePointsConstants.exercisePoints);
        }

        if (currentExercise.playerBChoice === currentExercise.correctAnswer) {
            Logger.info(`[SingleGame] Adding 10 points to player B (${this.playerTwo})`, __dirname);
            this.addPoints("playerB.points", GamePointsConstants.exercisePoints);
        }

        const game = Games.findOne(this.gameId);
        if (game) {
            if (game.playerA.points >= GamePointsConstants.winRequirement &&
                game.playerB.points >= GamePointsConstants.winRequirement) {
                this.finishGame("DRAW");
                Logger.info(`[SingleGame] Game ended with draw.`, __dirname);
            } else if (game.playerA.points >= GamePointsConstants.winRequirement) {
                this.finishGame(game.playerA.id);
                Logger.info(`[SingleGame] Player A (${game.playerA.id}) won the game.`, __dirname);
            } else if (game.playerB.points >= GamePointsConstants.winRequirement) {
                this.finishGame(game.playerB.id);
                Logger.info(`[SingleGame] Player B (${game.playerB.id}) won the game.`, __dirname);
            } else {
                Logger.info(`[SingleGame] Starting new round of the game ${this.gameId}.`, __dirname);
                this.startNewRound();
            }
        } else {
            Logger.error(`[SingleGame] Couldn't calculate points because game object is undefined.`, __dirname);
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
