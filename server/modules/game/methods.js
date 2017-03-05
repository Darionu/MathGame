import GameManager from './index';
import Logger from '/lib/logging/Logger';

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
    });
};
