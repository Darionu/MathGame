import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import DateFormat from '/lib/constants/dateTimeFormat';
import QueueStatuses from '/lib/constants/queueStatuses';
import QueuePriorities from '/lib/constants/queuePriorities';

const QueueHistory = new SimpleSchema({
    userId: {
        type: String,
        label: 'Id of user being in queue'
    },
    status: {
        type: Number,
        allowedValues: [
            QueueStatuses.userOffline,
            QueueStatuses.started,
            QueueStatuses.finished
        ],
        label: 'Status of a queue'
    },
    priority: {
        type: Number,
        allowedValues: [
            QueuePriorities.veryLow,
            QueuePriorities.low,
            QueuePriorities.medium,
            QueuePriorities.high,
            QueuePriorities.veryHigh,
            QueuePriorities.urgent
        ],
        label: 'Priority. Increases over time'
    },
    startDate: {
        type: Date,
        regEx: DateFormat.logDateTimeFormatRegex,
        label: 'Date of queue start in format: YYYY-MM-DD HH:mm:ss.SSS'
    },
    endDate: {
        type: Date,
        regEx: DateFormat.logDateTimeFormatRegex,
        label: 'Date of queue end in format: YYYY-MM-DD HH:mm:ss.SSS'
    }
});

export default QueueHistory;
