import LogConstants from '../constants/logConstants';
import DateFormat from '../constants/dateTimeFormat';
import dbLogging from '/lib/logging/databaseLogging';
import moment from 'moment';
import ServerMethodsNames from '/lib/constants/serverMethodsNames';

class Logger {
    constructor() {
        this._console = true; // true - show logs in console
        this._acceptableLevel = LogConstants.debug; // 1 - all (info and upper) 2 - info and warn and error, 3 - warn and error, 4 - error only
    }

    debug(log, filename) {
        this._log(LogConstants.debug, log, filename);
    }

    info(log, filename) {
        this._log(LogConstants.info, log, filename);
    }

    warn(log, filename) {
        this._log(LogConstants.warn, log, filename);
    }

    error(log, filename) {
        this._log(LogConstants.error, log, filename);
    }

    _log(logLevel, log, filename) {
        if (logLevel >= this._acceptableLevel) {
            this._dbLogging(logLevel, log, filename);
            if (this._console) {
                if (Meteor.isServer) {
                    this._serverLogging(logLevel, log, filename);
                } else {
                    this._clientLogging(logLevel, log, filename);
                }
            }
        }
    }

    _dbLogging(logLevel, log, filename) {
        if (Meteor.isServer) {
            dbLogging(logLevel, log, filename, LogConstants.serverSide, LogConstants.serverSide, moment().format(DateFormat.fullDateTimeFormat));
        } else {
            let userId = LogConstants.unknownUser;
            let userName = LogConstants.unknownUser;
            if (Meteor.user()) {
                userId = Meteor.user()._id;
                userName = Meteor.user().username;
            }
            Meteor.call(ServerMethodsNames.log, logLevel, log, filename, userId, userName, moment().format(DateFormat.fullDateTimeFormat));
        }
    }

    _serverLogging(logLevel, log, filename) {
        const logMessage = `[${moment().format(DateFormat.simplyTimeFormat)}] [${logLevel}] [${filename}] ${log}`;
        if (logLevel === LogConstants.error) {
            console.error(logMessage);
        } else {
            console.log(logMessage);
        }
    }

    _clientLogging(logLevel, log, filename) {
        const logMessage = `${moment().format(DateFormat.simplyTimeFormat)} [${filename}] ${log}`;
        switch (logLevel) {
            case LogConstants.warn: console.warn(logMessage); break;
            case LogConstants.error: console.error(logMessage); break;
            case LogConstants.debug: console.debug(logMessage); break;
            default: console.log(logMessage); break;
        }
    }
}

const singleton = (() => {
    let instance;
    const createInstance = () => new Logger();
    return {
        getInstance: () => {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

export default singleton.getInstance();
