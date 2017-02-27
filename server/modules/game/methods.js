import GameManager from './index';

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
            return GameManager.answer(this.userId, answer);
        },
    });
};
