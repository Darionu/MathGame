import Logger from '/lib/logging/Logger';
import ServerMethodsNames from '/lib/constants/serverMethodsNames';
import LocalStateKeys from '/lib/constants/localStateKeys';

export default {
    sendAnswer({ Meteor, LocalState }, answer, button) {
        Meteor.call(ServerMethodsNames.sendAnswer, answer, (error, result) => {
            if (error) {
                Logger.error(`Error during sending answer: ${error.reason ? error.reason : error}`, __filename);
            } else if (result === true || result === false) {
                LocalState.set(LocalStateKeys.waitingForNextRound, true);
                button.markAnswer(result);
                Logger.info('Server received answer properly', __filename);
            } else {
                Logger.warn('Server already received your answer before.', __filename);
            }
        });
    },
    enableAnswerButtons({ LocalState }) {
        LocalState.set(LocalStateKeys.waitingForNextRound, false);
    }
};
