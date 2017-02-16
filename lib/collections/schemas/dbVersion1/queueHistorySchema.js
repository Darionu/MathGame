import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import DateFormat from '/lib/constants/dateTimeFormat';
import QueueStatuses from '/lib/constants/queueStatuses';
import QueuePriorities from '/lib/constants/queuePriorities';
import { GameTypes } from '/lib/constants/gameConstants';

const QueueHistory = new SimpleSchema({
    userId: {
        type: String,
        label: 'Id of user being in queue'
    },
    status: {
        type: Number,
        label: 'Status of a queue',
        allowedValues: [
            QueueStatuses.serverRestart,
            QueueStatuses.userOffline,
            QueueStatuses.started,
            QueueStatuses.finished,
            QueueStatuses.stoppedByUser,
            QueueStatuses.timeout
        ],
        defaultValue: QueueStatuses.started
    },
    gameType: {
        type: Number,
        label: 'Type of the game player was queued for',
        allowedValues: [
            GameTypes.addition,
            GameTypes.division,
            GameTypes.multiplication,
            GameTypes.subtraction
        ]
    },
    priority: {
        type: Number,
        label: 'Priority. Increases over time',
        allowedValues: [
            QueuePriorities.veryLow,
            QueuePriorities.low,
            QueuePriorities.medium,
            QueuePriorities.high,
            QueuePriorities.veryHigh,
            QueuePriorities.urgent
        ],
        defaultValue: QueuePriorities.veryLow
    },
    startDate: {
        type: Date,
        regEx: DateFormat.logDateTimeFormatRegex,
        label: 'Date of queue start in format: YYYY-MM-DD HH:mm:ss.SSS',
        autoValue: function() {
            if (this.isInsert) {
                return new Date;
            }
        }
    },
    endDate: {
        type: Date,
        regEx: DateFormat.logDateTimeFormatRegex,
        label: 'Date of queue end in format: YYYY-MM-DD HH:mm:ss.SSS',
        optional: true
    }
});

export default QueueHistory;
