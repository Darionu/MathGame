import { QueueHistory } from '/lib/collections/index';
import TimeConstants from '/lib/constants/timeConstants';
import QueueStatuses from '/lib/constants/queueStatuses';
import { QueuePriorities, QueueLimits } from '/lib/constants/queuePriorities';
import moment from 'moment';
import Logger from '/lib/logging/Logger';

/**
 * Queue interval instance is running interval which checks for active players waiting in queue.
 * It's responsibility is to set the correct priority of the queueRecord and also timeout the record
 * if too much time passed from the starting date.
 */
export default class QueueInterval {
    constructor() {
        this.init();
    }

    /**
     * Setting interval during the initialization
     */
    init() {
        Meteor.setInterval(() => {
            this.intervalFunction();
        }, TimeConstants.queueIntervalTimeout);
    }

    /**
     * Finding all awaiting users in queue.
     * For each of the users invoke priority set method.
     */
    intervalFunction() {
        const playersInQueue = QueueHistory.find({
            status: QueueStatuses.started
        }, {
            fields: {
                status: 1,
                priority: 1,
                startDate: 1
            }
        }).fetch();

        playersInQueue.forEach((queueRecord) => {
            this.setPlayerPriority(queueRecord);
        });
    }

    /**
     * Calculates the difference between time of the join to the queue compared to current time.
     * If the difference is higher than the limit then it will be bumped one level higher.
     * @param {Object} queueRecord - record from QueueHistory
     */
    setPlayerPriority(queueRecord) {
        const startingDate = queueRecord.startDate;
        const currentDate = new Date();
        const difference = moment.duration(moment(currentDate).diff(moment(startingDate)));

        if (this.shouldPriorityChange(queueRecord.priority, difference.asSeconds())) {
            this.bumpPriorityLevel(queueRecord._id, queueRecord.priority);
        }
    }

    /**
     * Check if difference extended current priority limit.
     * @param {number} priority
     * @param {number} difference
     * @return {boolean} shouldPriorityChange
     */
    shouldPriorityChange(priority, difference) {
        switch(priority) {
            case QueuePriorities.veryLow:
                return difference >= QueueLimits[QueuePriorities.veryLow];
                break;
            case QueuePriorities.low:
                return difference >= QueueLimits[QueuePriorities.low];
                break;
            case QueuePriorities.medium:
                return difference >= QueueLimits[QueuePriorities.medium];
                break;
            case QueuePriorities.high:
                return difference >= QueueLimits[QueuePriorities.high];
                break;
            case QueuePriorities.veryHigh:
                return difference >= QueueLimits[QueuePriorities.veryHigh];
                break;
            case QueuePriorities.urgent:
                return difference >= QueueLimits[QueuePriorities.urgent];
                break;
            default:
                return true;
                break;
        }
    }

    /**
     * Update queueHistory record by setting it's priority.
     * If the priority reached level timeout then we are ending the lifecycle of this queue record;
     * @param {string} id
     * @param {number} priority
     */
    bumpPriorityLevel(id, priority) {
        let newPriority = '';
        switch(priority) {
            case QueuePriorities.veryLow:
                newPriority = QueuePriorities.low;
                break;
            case QueuePriorities.low:
                newPriority = QueuePriorities.medium;
                break;
            case QueuePriorities.medium:
                newPriority = QueuePriorities.high;
                break;
            case QueuePriorities.high:
                newPriority = QueuePriorities.veryHigh;
                break;
            case QueuePriorities.veryHigh:
                newPriority = QueuePriorities.urgent;
                break;
            case QueuePriorities.urgent:
                newPriority = QueuePriorities.timeout;
                break;
            default:
                Logger.error(`[QueueInterval] Unknown priority (${priority}) for id (${id}).`, __dirname);
                break;
        }

        if (newPriority === QueuePriorities.timeout) {
            QueueHistory.update(id, {
                $set: {
                    status: QueueStatuses.timeout,
                    endDate: new Date()
                }
            });
            Logger.info('[QueueInterval] Player extended the limit of waiting time. Set status to timeout.', __dirname);
        } else if (newPriority !== '') {
            QueueHistory.update(id, {
                $set: {
                    priority: newPriority,
                    endDate: new Date()
                }
            });
            Logger.info(`[QueueInterval] Change priority of id (${id}) to (${newPriority}).`, __dirname);
        } else {
            QueueHistory.update(id, {
                $set: {
                    status: QueueStatuses.error,
                    endDate: new Date()
                }
            });
            Logger.error(`[QueueInterval] Set status of id (${id}) to error.`, __dirname);
        }
    }
};
