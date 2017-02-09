import ServerMethodNames from '/lib/constants/serverMethodsNames';
import Logger from '/lib/logging/Logger';

export default {
    joinQueue({ LocalState, providers }, gameType) {
        Meteor.call(ServerMethodNames.joinQueue, gameType, (result, error) => {
            if (error) {

            } else {
                Logger.info(`User (${Meteor.userId()}) joined queue (${gameType})`, __filename);
            }
        });
    }
};
