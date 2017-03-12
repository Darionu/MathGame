import ServerMethodNames from '/lib/constants/serverMethodsNames';
import Logger from '/lib/logging/Logger';
import LocalStateKeys from '/lib/constants/localStateKeys';
import OpponentTypes from '/lib/constants/opponentTypes';
import LanguageConstants from '/lib/constants/languageConstants';

export default {
    joinQueue({ LocalState, providers }, gameType) {
        if (!Meteor.userId()) {
            const userLanguage = providers.localStorageProvider.getLanguage()
                ? providers.localStorageProvider.getLanguage()
                : LanguageConstants.english;
            Meteor.call(ServerMethodNames.createTempAccount, userLanguage, (error, result) => {
                if (error) {
                    Logger.error(`Error during initialize bot game attempt: ${error.reason ? error.reason : error}`, __filename);
                } else if (result) {
                    Logger.info(`User (${Meteor.userId()}) joined initialized game with bot (${gameType})`, __filename);
                    Meteor.loginWithPassword(result.login, result.password, (error) => {
                        Meteor.call(ServerMethodNames.startGameWithBot, gameType, (error, result) => {
                            if (error) {
                                Logger.error(`Error during initialize bot game attempt: ${error.reason ? error.reason : error}`, __filename);
                            } else if (result === true) {
                                Logger.info(`User (${Meteor.userId()}) joined initialized game with bot (${gameType})`, __filename);
                            } else {
                                Logger.warn(result, __filename);
                            }
                        });
                    });
                }
            });
        } else if (LocalState.get(LocalStateKeys.chosenOpponent) === OpponentTypes.bot) {
            Meteor.call(ServerMethodNames.startGameWithBot, gameType, (error, result) => {
                if (error) {
                    Logger.error(`Error during initialize bot game attempt: ${error.reason ? error.reason : error}`, __filename);
                } else if (result === true) {
                    Logger.info(`User (${Meteor.userId()}) joined initialized game with bot (${gameType})`, __filename);
                } else {
                    Logger.warn(result, __filename);
                }
            });
        } else {
            Meteor.call(ServerMethodNames.joinQueue, gameType, (error, result) => {
                if (error) {
                    Logger.error(`Error during joining queue attempt: ${error.reason ? error.reason : error}`, __filename);
                } else if (result === true) {
                    Logger.info(`User (${Meteor.userId()}) joined queue (${gameType})`, __filename);
                } else {
                    Logger.warn(result, __filename);
                }
            });
        }
    },
    quitQueue({}) {
        Meteor.call(ServerMethodNames.quitQueue, (error, result) => {
            if (error) {
                Logger.error(`Error during leaving queue attempt: ${error.reason ? error.reason : error}`, __filename);
            } else if (result === true) {
                Logger.info(`User (${Meteor.userId()}) left queue`, __filename);
            } else {
                Logger.warn(result, __filename);
            }
        });
    },
    toggleOpponentType({ LocalState }) {
        if (Meteor.user()) {
            const currentType = LocalState.get(LocalStateKeys.chosenOpponent);
            const newType = currentType === OpponentTypes.bot ? OpponentTypes.player : OpponentTypes.bot;
            LocalState.set(LocalStateKeys.chosenOpponent, newType);
        }
    }
};
