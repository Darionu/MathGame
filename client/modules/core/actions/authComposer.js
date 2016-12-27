import localStateKeys from '/lib/constants/localStateKeys';
import AppRoutes from '/lib/constants/appRoutes';

export default {
    switchLayout({ LocalState }, layout) {
        document.body.className = `${layout}Theme`;
        LocalState.set(localStateKeys.layout, layout);
    },
    saveCurrentLayout({ providers }, layout) {
        providers.localStorageProvider.setLayout(layout);
    },
    saveCurrentLanguage({ providers }, language) {
        providers.localStorageProvider.setLanguage(language);
    },
    switchLanguage({ LocalState }, language) {
        LocalState.set(localStateKeys.language, language);
    },
    handleUserData({ FlowRouter, LocalState, actions, providers }, userResult) {
        const { language, layout } = userResult.userData;
        actions.authComposer.switchLanguage({ LocalState }, language);
        actions.authComposer.saveCurrentLanguage({ providers }, language);
        actions.authComposer.switchLayout({ LocalState }, layout);
        actions.authComposer.saveCurrentLayout({ providers }, layout);
        FlowRouter.go(AppRoutes.home);
    }
};
