import QueueManager from '../queue';
import Logger from '/lib/logging/Logger';
import ReadyCheck from './readyCheck';
import GameProtocol from './gameProtocol';
import { Games } from '/lib/collections';
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
     */
    createGame() {
        Logger.info(`[SingleGame] Game manager initialization for players ${this.playerOne.username}(${this.playerOne._id}) & ${this.playerTwo.username}(${this.playerTwo._id})`, __dirname);
        this.gameId = Games.insert({
            type: this.gameType,
            playerA: this.playerOne._id,
            playerB: this.playerTwo._id
        });

        if (this.gameId) {
            this.startGame();
        } else {
            Logger.error(`[SingleGame] Encountered error during inserting game to the database.`, __dirname);
            // TODO: Put users back to the queue.
        }
    }

    /**
     * Start the game mechanism.
     */
    startGame() {
        this.generateExercise().then(() => {
            this.bumpRound();
        }).catch((error) => {
            // TODO: Investigate why alarm from schema is appearing every time.
            Logger.warn(`[SingleGame] Encountered error during creating exercise: ${error}`, __dirname);
            // Meteor.setTimeout(() => {
            //     this.startGame();
            // }, 500);
        });
    }

    /**
     * Increments round number by one.
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
     * Finishes the game and sets the winner id.
     * @param {string} winnerId - _id of a player who won the game.
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
};
