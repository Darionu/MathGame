import { Logs } from '/lib/collections/index';

export default (logLevel, log, fileName, userId, userName, date) => {
    Logs.insert({
        logLevel,
        fileName,
        userId,
        userName,
        log,
        date
    });
};
