import GameManager from './index';
import Logger from '/lib/logging/Logger';
import { Games } from '/lib/collections';
import AccountTypes from '/lib/constants/accountTypes';
import PlayersManager from '/server/modules/players';

/**
 * Methods related to GameSystem to be called from the client.
 */
export default () => {
    Meteor.methods({
        /**
         * Sends an answer for a current exercise.
         * @param answer - chosen answer by the user.
         * @returns {boolean} - result of answer operation.
         */
        sendAnswer: function (answer) {
            check(answer, Number);
            const answerDate = new Date();
            Logger.info(`[GameMethods] Received answer (${answer}) from a player (${this.userId})`, __dirname);
            return GameManager.answer(this.userId, answer, answerDate);
        },
        /**
         * Sends a confirmation that player saw the result screen.
         * @param {string} gameId - game which player saw.
         */
        markResultScreenAsSeen: function (gameId) {
            check(gameId, String);
            const game = Games.findOne(gameId);
            if (game) {
                const fieldToSet = (game.playerA.id === this.userId) ? "playerA.read" : "playerB.read";
                Games.update(gameId, {
                    $set: {
                        [fieldToSet]: true
                    }
                });
            }

            const user = Meteor.users.findOne(this.userId);
            if (user && user.userData.accountType === AccountTypes.temporary) {
                PlayersManager.deleteTemporaryUser(this.userId);
            }
        },
        /**
         * Handles player request to start a game with bot opponent.
         * @param {number} gameType - chosen game type.
         */
        startGameWithBot: function (gameType) {
            check(gameType, Number);
            const player = Meteor.users.findOne(this.userId);

            if (!player) {
                throw new Meteor.Error("Unauthorized", "You have to be online to start the game", __dirname);
            }

            GameManager.startGameWithBot(player, gameType);
        }
    });
};
