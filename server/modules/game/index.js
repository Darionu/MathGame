import methods from './methods';
import Logger from '/lib/logging/Logger';
import { Games } from '/lib/collections';
import _ from 'lodash';
import { GameStatuses } from '/lib/constants/gameConstants';
import SingleGame from './singleGame';

/**
 * GameManager
 *
 * This class is responsible for the game mechanism.
 */
export default new class GameManager {
    constructor() {
        methods();

        this.gameList = [];
        this.init();
    }

    /**
     * Logic to do at the class initialization.
     * @private
     */
    init() {
        this.stopAllGames();
    }

    /**
     * Find all not ended games and finish them afterwards.
     * @public
     */
    stopAllGames() {
        Games.update({
            status: {
                $in: [
                    GameStatuses.started,
                    GameStatuses.initialized,
                    GameStatuses.created
                ]
            }
        }, {
            $set: {
                status: GameStatuses.serverRestart
            }
        }, { multi: true });
    }

    /**
     * Creates new single game instance and pushes it to the game list.
     * @param {Object} playerOne
     * @param {Object} playerTwo
     * @param {number} gameType - chosen game type
     * @public
     */
    startGame(playerOne, playerTwo, gameType) {
        const game = new SingleGame(playerOne, playerTwo, gameType);
        this.gameList.push({
            type: this.gameType,
            playerA: playerOne._id,
            playerB: playerTwo._id,
            game
        });
    }

    /**
     * Handle received answer for a question by specific player.
     * @param {string} playerId - _id of a player.
     * @param {number} answer - chosen answer.
     * @returns {boolean} result - success/fail.
     * @public
     */
    answer(playerId, answer) {
        const gameObject = this.findGameByPlayer(playerId);
        return gameObject
            ? gameObject.game.addAnswer(playerId, answer)
            : false;
    }

    /**
     * Forfeit the game for a specific player and mark the other one as a winner.
     * @param {string} playerId - _id of a player which forfeited.
     * @public
     */
    forfeitGame(playerId) {
        const gameObject = this.findGameByPlayer(playerId);
        if (gameObject) {
            Logger.info(`[GameManager] Game forfeited by player ${playerId}`, __dirname);
            const winner = gameObject.playerB === playerId
                ? gameObject.playerA
                : gameObject.playerB;
            gameObject.game.finishGame(winner);
            this.announceWinnerAndLoser(winner, playerId);
        }
        this.removeGame(playerId);
    }

    /**
     * Handles results and changing player statistics based on them.
     * @param winner - id of a player who won the game
     * @param looser - id of a player who lost the game
     */
    announceWinnerAndLoser(winner, looser) {
        Meteor.users.update(winner, {
            $inc: {
                "gameData.wins": 1
            }
        });

        Meteor.users.update(looser, {
            $inc: {
                "gameData.loses": 1
            }
        });
    }

    /**
     * Find a game which has provided player as attendee.
     * @param playerId - _id of the player to find the game for.
     * @returns {Object} game
     * @private
     */
    findGameByPlayer(playerId) {
        return _.find(this.gameList, (singleGame) => {
            return singleGame.playerA === playerId || singleGame.playerB === playerId;
        });
    }

    /**
     * Removes single game instance from the GameList array.
     * @param {string} playerId - _id of participant of the game.
     * @private
     */
    removeGame(playerId) {
        Logger.info(`[GameManager] Remove game for player ${playerId} from game list.`, __dirname);
        _.remove(this.gameList, (singleGame) => {
            return singleGame.playerA === playerId || singleGame.playerB === playerId;
        });
    }
};
