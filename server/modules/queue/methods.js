import { check } from 'meteor/check';
import QueueManager from './index';
import QueueStatuses from '/lib/constants/queueStatuses';
import { QueueHistory } from '/lib/collections/index';

/**
 * Methods related to Queue handling to be called from the client.
 */
export default () => {
    Meteor.methods({
        /**
         * Handle user request to be putted into the queue.
         * @param {number} gameType - type of the selected by user game
         * @return {boolean | string} joinQueueSuccess
         */
        joinQueue: function (gameType) {
            check(gameType, Number);

            if (!this.userId) {
                throw new Meteor.Error("Unauthorized", "You have to be online to join the queue");
            }

            const queueRecord = QueueHistory.findOne({
                userId: this.userId,
                status: QueueStatuses.started
            }, {
                fields: {
                    userId: 1
                }
            });

            if (queueRecord) {
               return `User (${this.userId}) is already in queue`;
            }

            return QueueManager.putUserToQueue(this.userId, gameType);
        },
        /**
         * Handle user request to leave queue.
         * @return {boolean | string} leaveQueueSuccess
         */
        quitQueue: function () {
            if (!this.userId) {
                throw new Meteor.Error("Unauthorized", "You have to be online to join the queue");
            }

            const queueRecord = QueueHistory.findOne({
                userId: this.userId,
                status: QueueStatuses.started
            }, {
                fields: {
                    userId: 1
                }
            });

            if (!queueRecord) {
                return `User (${this.userId}) is not in queue`;
            }

            return QueueManager.removeUserFromQueue(this.userId);
        }
    });
};
