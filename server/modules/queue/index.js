import { QueueHistory } from '/lib/collections/index';
import methods from './methods';
import QueueInterval from './queueInterval';
import QueueStatuses from '/lib/constants/queueStatuses';
import Logger from '/lib/logging/Logger';

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
        Logger.info('[QueueManager] Queue Manager initialized.', __dirname);
        this.resetQueue();
        this.queueInterval = new QueueInterval();
    }

    /**
     * Handle stuck queue records after server restart.
     */
    resetQueue() {
        Logger.info(`[QueueManager] Performing queue reset at the start of class initialization.`, __dirname);
        QueueHistory.update({
            status: QueueStatuses.started
        }, {
            $set: {
                status: QueueStatuses.serverRestart
            }
        }, { multi: true });
    }

    /**
     * Stops the queue for two users.
     * Mostly used after they are matched together.
     * @param {string} playerOne - id of a first user.
     * @param {string} playerTwo - id of a second user.
     */
    stopQueue(playerOne, playerTwo) {
        Logger.info(`[QueueManager] Stopping queue for users ${playerOne.username}(${playerOne._id}) & ${playerTwo.username}(${playerTwo._id}).`, __dirname);
        QueueHistory.update({
            userId: {
                $in: [
                    playerOne,
                    playerTwo
                ]
            },
            status: QueueStatuses.started
        }, {
            $set: {
                status: QueueStatuses.finished
            }
        }, { multi: true });
    }

    /**
     * Adding new player to the queue
     * @param userId - id of an user to be putted into the queue.
     * @param gameType - type of the selected by user game.
     * @return {boolean} id - id of new QueueHistory record.
     */
    putUserToQueue(userId, gameType) {
        Logger.info(`[QueueManager] Putting user ${userId} to the queue for game type ${gameType}.`, __dirname);
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
        Logger.info(`[QueueManager] Remove user ${userId} from the queue.`, __dirname);
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
