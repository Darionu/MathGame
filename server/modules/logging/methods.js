import dbLogging from '/lib/logging/databaseLogging';
import { check } from 'meteor/check';

export default () => {
    Meteor.methods({
        log: (logLevel, log, filename, user, type, date) => {
            check(logLevel, Number);
            check(log, String);
            check(filename, String);
            check(user, String);
            check(type, String);
            check(date, String);
            dbLogging(logLevel, log, filename, user, type, date);
        }
    });
};
