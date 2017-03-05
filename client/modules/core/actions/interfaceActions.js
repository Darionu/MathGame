import LocalStateKeys from '/lib/constants/localStateKeys';
import RouteNames from '/lib/constants/routeNames';

export default {
    switchLoginBoxState({ LocalState }) {
        const isLoginBoxVisible = !!(LocalState.get(LocalStateKeys.isLoginBoxVisible));
        LocalState.set(LocalStateKeys.isLoginBoxVisible, !isLoginBoxVisible);
    },
    goToHomePage({ FlowRouter }) {
        FlowRouter.go(RouteNames.home);
    },
    goToRankings({ FlowRouter }) {
        FlowRouter.go(RouteNames.rankings);
    },
    goToPlayBoard({ FlowRouter }) {
        FlowRouter.go(RouteNames.playBoard);
    },
    goToLearn({ FlowRouter }) {
        FlowRouter.go(RouteNames.learn);
    },
    goToSpecificRoute({ FlowRouter }, routeName) {
        if (routeName) {
            FlowRouter.go(routeName)
        } else {
            FlowRouter.go(RouteNames.home);
        }
    },
    setLanguage({ LocalState, providers }, language) {
        LocalState.set(LocalStateKeys.language, language);
        providers.localStorageProvider.setLanguage(language);
    }
};
