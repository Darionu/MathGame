import localStateKeys from '/lib/constants/localStateKeys';
import RouteNames from '/lib/constants/routeNames';

export default {
    switchLoginBoxState({ LocalState }) {
        const isLoginBoxVisible = !!(LocalState.get(localStateKeys.isLoginBoxVisible));
        LocalState.set(localStateKeys.isLoginBoxVisible, !isLoginBoxVisible);
    },
    goToHomePage({ FlowRouter }) {
        FlowRouter.go(RouteNames.home);
    }
};
