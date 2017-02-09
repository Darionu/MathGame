import { check } from 'meteor/check';
import QueueManager from './index';

/**
 * Methods related to Queue handling to be called from the client.
 */
export default () => {
    Meteor.methods({
        /**
         * Handle user request to be putted into the queue.
         * @param {number} gameType - type of the selected by user game
         * @return {boolean} joinQueueSuccess
         */
        joinQueue: function (gameType) {
            check(gameType, Number);

            if (!this.userId) {
                throw new Meteor.Error("Unauthorized", "You have to be online to join the queue");
            }

            return !!QueueManager.putUserToQueue(this.userId, gameType);
        }
    });
};
