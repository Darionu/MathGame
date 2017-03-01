import QueueManager from '../queue';
import Logger from '/lib/logging/Logger';
import ReadyCheck from './readyCheck';
import GameProtocol from './gameProtocol';
import { Games, Exercises } from '/lib/collections';
import ExerciseGenerator from '/server/modules/exerciseGenerator';
import { GameStatuses } from '/lib/constants/gameConstants';

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
            playerA: this.playerOne._id,
            playerB: this.playerTwo._id
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
        Games.update(this.gameId, {
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
        const playerType = game.playerA === playerId
            ? 'playerAChoice'
            : 'playerBChoice';

        const exercise = Exercises.findOne(currentExercise);
        if (exercise[playerType]){
            Logger.warn('Player already answered to the question', __dirname);
            return true;
        }

        const result = Exercises.update(currentExercise, {
            $set: {
                [playerType]: answer
            }
        });

        this.checkIfStartNewTurn();
        return result === 1;
    }

    /**
     * Start the game mechanism for a single new round.
     * @private
     */
    startNewRound() {
        this.generateExercise().then(() => {
            this.bumpRound();
        }).catch((error) => {
            Logger.warn(`[SingleGame] Encountered error during creating exercise: ${error}`, __dirname);
        });
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
     * Checks if all the requirements for starting a new turn are set.
     * If so then starts a new turn.
     * @private
     */
    checkIfStartNewTurn() {
        const game = Games.findOne(this.gameId);
        const currentExerciseId = _.last(game.exercises);
        const currentExercise = Exercises.findOne(currentExerciseId);

        if (currentExercise && currentExercise.playerAChoice && currentExercise.playerBChoice) {
            this.startNewRound();
        }
    }
};
