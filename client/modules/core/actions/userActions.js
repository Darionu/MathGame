import LocalStateKeys from '/lib/constants/localStateKeys';
import Alert from 'react-s-alert';
import ServerMethodsNames from '/lib/constants/serverMethodsNames'

export default {
    loginAttempt({ LocalState, providers }, login, password, messages) {
        Meteor.loginWithPassword(login, password, (error) => {
            if (error) {
                Alert.error(messages.loginFail);
            } else {
                LocalState.set(LocalStateKeys.isLoginBoxVisible, false);
                Alert.success(messages.loginSuccess);

                Meteor.call(ServerMethodsNames.getUserData, (error, result) => {
                    const language = result.userData.language;
                    LocalState.set(LocalStateKeys.language, language);
                    providers.localStorageProvider.setLanguage(language);
                });
            }
        });
    },
    registerAttempt({ LocalState }, username, password, avatar, messages) {
        Meteor.call(ServerMethodsNames.registerUser, username, password, avatar, (error) => {
            if (error) {
                Alert.error(messages.registerFail);
            } else {
                LocalState.set(LocalStateKeys.isLoginBoxVisible, false);
                Alert.success(messages.registerSuccess);
            }
        });
    },
    logout({}) {
        Meteor.logout();
    }
};
