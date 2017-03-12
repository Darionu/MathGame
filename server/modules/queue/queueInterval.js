import { QueueHistory } from '/lib/collections/index';
import TimeConstants from '/lib/constants/timeConstants';
import QueueStatuses from '/lib/constants/queueStatuses';
import { QueuePriorities, QueueLimits } from '/lib/constants/queuePriorities';
import moment from 'moment';
import Logger from '/lib/logging/Logger';
import Matchmaking from './matchmaking';
import { GameTypes } from '/lib/constants/gameConstants';

/**
 * Queue Interval
 *
 * Queue interval instance is running interval which checks for active players waiting in queue.
 * It's responsibility is to set the correct priority of the queueRecord and also timeout the record
 * if too much time passed from the starting date.
 */
export default class QueueInterval {
    constructor() {
        this.matchmakingIsActive = false;
        this.init();
    }

    /**
     * Setting interval during the initialization
     */
    init() {
        Logger.info('[QueueInterval] Queue Interval initialized.', __dirname);
        Meteor.setInterval(() => {
            if (!this.matchmakingIsActive) {
                this.intervalFunction();
            }
        }, TimeConstants.queueIntervalTimeout);
    }

    /**
     * Function invoked inside interval.
     * After finishing one turn of matchmaking attempt then priority system is invoked.
     */
    intervalFunction() {
        this.matchmakingIsActive = true;
        const matchmakingInstances = {
            addition: new Matchmaking(GameTypes.addition),
            subtraction: new Matchmaking(GameTypes.subtraction),
            multiplication: new Matchmaking(GameTypes.multiplication),
            division: new Matchmaking(GameTypes.division)
        };

        Promise.all([
            matchmakingInstances.addition.initMatchmaking(),
            matchmakingInstances.subtraction.initMatchmaking(),
            matchmakingInstances.multiplication.initMatchmaking(),
            matchmakingInstances.division.initMatchmaking()
        ]).then(() => {
            this.initPrioritySystem();
            this.matchmakingIsActive = false;
        });
    }

    /**
     * Finding all awaiting players in queue.
     * For each of the players invoke priority set method.
     */
    initPrioritySystem() {
        return new Promise((resolve) => {
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

            resolve();
        })
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
     * Check if the difference extended current priority limit.
     * @param {number} priority
     * @param {number} difference
     * @return {boolean} shouldPriorityChange
     */
    shouldPriorityChange(priority, difference) {
        return priority === QueuePriorities.timeout ? true : difference >= QueueLimits[priority];
    }

    /**
     * Update queueHistory record by setting it's priority.
     * If the priority reached level timeout then we are ending the lifecycle of this queue record;
     * @param {string} id
     * @param {number} priority
     */
    bumpPriorityLevel(id, priority) {
        switch(priority) {
            case QueuePriorities.veryLow:
                this.updatePriority(id, QueuePriorities.low);
                break;
            case QueuePriorities.low:
                this.updatePriority(id, QueuePriorities.medium);
                break;
            case QueuePriorities.medium:
                this.updatePriority(id, QueuePriorities.high);
                break;
            case QueuePriorities.high:
                this.updatePriority(id, QueuePriorities.veryHigh);
                break;
            case QueuePriorities.veryHigh:
                this.updatePriority(id, QueuePriorities.urgent);
                break;
            case QueuePriorities.urgent:
                QueueHistory.update(id, {
                    $set: {
                        status: QueueStatuses.timeout,
                        endDate: new Date()
                    }
                });
                Logger.info(
                    '[QueueInterval] Player extended the limit of waiting time. Set status to timeout.',
                    __dirname
                );
                break;
            default:
                QueueHistory.update(id, {
                    $set: {
                        status: QueueStatuses.error,
                        endDate: new Date()
                    }
                });
                Logger.error(
                    `[QueueInterval] Unknown priority (${priority}) for id (${id}). Set status to error.`,
                    __dirname
                );
                break;
        }
    }

    /**
     * Sets new priority to selected queue history element.
     * @param {string} id - id of an queue history record to update.
     * @param {number} priority - new priority.
     */
    updatePriority(id, priority) {
        QueueHistory.update(id, {
            $set: {
                priority,
                endDate: new Date()
            }
        });
        Logger.info(`[QueueInterval] Changed priority of id (${id}) to (${priority}).`, __dirname);
    }
};
