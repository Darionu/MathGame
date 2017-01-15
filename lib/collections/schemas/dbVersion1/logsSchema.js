import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import DateFormat from '/lib/constants/dateTimeFormat';
import LogConstants from '/lib/constants/logConstants';

const LogsSchema = new SimpleSchema({
    logLevel: {
        type: Number,
        label: 'Type of log (1 - debug, 2 - info, 3 - warn, 4 - error)',
        allowedValues: [ LogConstants.debug, LogConstants.info, LogConstants.warn, LogConstants.error ]
    },
    fileName: {
        type: String,
        label: 'Path to current file which log was added'
    },
    userId: {
        type: String,
        label: 'Current userID, which create log'
    },
    userName: {
        type: String,
        label: 'Current username, which create log'
    },
    log: {
        type: String,
        label: 'Content of log'
    },
    date: {
        type: Date,
        regEx: DateFormat.logDateTimeFormatRegex,
        label: 'Create date in format: YYYY-MM-DD HH:mm:ss.SSS'
    }
});

export default LogsSchema;
