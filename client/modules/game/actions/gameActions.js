import Logger from '/lib/logging/Logger';
import ServerMethodsNames from '/lib/constants/serverMethodsNames';

export default {
    sendAnswer({ Meteor }, answer) {
        Meteor.call(ServerMethodsNames.sendAnswer, answer, (error, result) => {
            if (error) {
                Logger.error(`Error during sending answer: ${error.reason ? error.reason : error}`, __filename);
            } else if (result === true) {
                Logger.info(`Server received answer properly`, __filename);
            } else {
                Logger.warn(result, __filename);
            }
        });
    }
};
