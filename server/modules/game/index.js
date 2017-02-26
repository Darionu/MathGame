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
     */
    init() {
        this.stopAllGames();
    }

    /**
     * Find all not ended games and finish them afterwards.
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
     *
     * @param playerId - _id of the player to find the game for.
     * @returns {Object} game
     */
    findGameByPlayer(playerId) {
        return _.find(this.gameList, (singleGame) => {
            return singleGame.playerA === playerId || singleGame.playerB === playerId;
        });
    }

    /**
     * Forfeit the game for a specific player and mark the other one as a winner.
     * @param {string} playerId - _id of a player which forfeited.
     */
    forfeitGame(playerId) {
        const gameObject = this.findGameByPlayer(playerId);
        if (gameObject) {
            Logger.info(`[GameManager] Game forfeited by player ${playerId}`, __dirname);
            const winner = gameObject.playerB === playerId
                ? gameObject.playerA
                : gameObject.playerB;
            gameObject.game.finishGame(winner);
        }
    }

    answer(playerId, answer) {
        const gameObject = this.findGameByPlayer(playerId);
        return gameObject
            ? gameObject.game.addAnswer(playerId, answer)
            : false;
    }
};
