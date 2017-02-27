import Logger from '/lib/logging/Logger';
import LocalStateKeys from '/lib/constants/localStateKeys';
import Alert from 'react-s-alert';
import ServerMethodsNames from '/lib/constants/serverMethodsNames';
import { Games } from '/lib/collections';
import { GameStatuses } from '/lib/constants/gameConstants';

export default {
    loginAttempt({ LocalState, providers }, login, password, messages) {
        Meteor.loginWithPassword(login, password, (error) => {
            if (error) {
                Logger.warn(`Failed login attempt for user${login ? ' ' + login : ''}.`, __filename);
                Alert.error(messages.loginFail);
            } else {
                LocalState.set(LocalStateKeys.isLoginBoxVisible, false);
                Logger.info(`User ${login} logged in.`, __filename);
                Alert.success(messages.loginSuccess);

                Meteor.call(ServerMethodsNames.getUserData, (error, result) => {
                    const language = result.userData.language;
                    LocalState.set(LocalStateKeys.language, language);
                    providers.localStorageProvider.setLanguage(language);
                });
            }
        });
    },
    registerAttempt({ LocalState }, username, password, language, avatar, messages) {
        Meteor.call(ServerMethodsNames.registerUser, username, password, language, avatar, (error) => {
            if (error) {
                Logger.warn(`Failed to create new user${username ? ' ' + username : ''}.`, __filename);
                Alert.error(messages.registerFail);
            } else {
                Logger.info(`New user ${username} created.`, __filename);
                LocalState.set(LocalStateKeys.isLoginBoxVisible, false);
                Alert.success(messages.registerSuccess);
            }
        });
    },
    logout({}) {
        const game = Games.findOne({
            status: {
                $in: [
                    GameStatuses.created,
                    GameStatuses.started,
                    GameStatuses.initialized
                ]
            }
        });

        if (game) {
            const answer = confirm('You are currently in game. Are you sure you want to log out? It will make you lost the game.');
            if (answer) {
                Meteor.logout();
            }
        } else {
            Meteor.logout();
        }
    }
};
