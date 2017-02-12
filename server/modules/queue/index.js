import { QueueHistory } from '/lib/collections/index';
import methods from './methods';
import QueueInterval from './queueInterval';
import QueueStatuses from '/lib/constants/queueStatuses';

/**
 * QueueManager
 *
 * This class is responsible for the queue mechanism.
 */
export default new class {
    constructor() {
        methods();
        this.init();
    }

    /**
     * Creating QueueInterval instance during the class initialization.
     */
    init() {
        this.queueInterval = new QueueInterval();
    }

    /**
     * Adding new player to the queue
     * @param userId - id of an user to be putted into the queue.
     * @param gameType - type of the selected by user game.
     * @return {boolean} id - id of new QueueHistory record.
     */
    putUserToQueue(userId, gameType) {
        return !!QueueHistory.insert({
            userId,
            gameType
        });
    }

    /**
     * Removing player from the queue
     * @param userId - id of an user to be putted into the queue.
     * @return {boolean} result - true if almost one of the records were changed.
     */
    removeUserFromQueue(userId) {
        return QueueHistory.update({
            userId,
            status: QueueStatuses.started
        }, {
            $set: {
                status: QueueStatuses.stoppedByUser
            }
        }) > 0;
    }
};
