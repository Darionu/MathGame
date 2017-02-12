import ServerMethodNames from '/lib/constants/serverMethodsNames';
import Logger from '/lib/logging/Logger';

export default {
    joinQueue({}, gameType) {
        Meteor.call(ServerMethodNames.joinQueue, gameType, (error, result) => {
            if (error) {
                Logger.error(`Error during joining queue attempt: ${error.reason ? error.reason : error}`, __filename);
            } else if (result === true) {
                Logger.info(`User (${Meteor.userId()}) joined queue (${gameType})`, __filename);
            } else {
                Logger.warn(result, __filename);
            }
        });
    },
    quitQueue() {
        Meteor.call(ServerMethodNames.quitQueue, (error, result) => {
            if (error) {
                Logger.error(`Error during leaving queue attempt: ${error.reason ? error.reason : error}`, __filename);
            } else if (result === true) {
                Logger.info(`User (${Meteor.userId()}) left queue`, __filename);
            } else {
                Logger.warn(result, __filename);
            }
        });
    }
};
