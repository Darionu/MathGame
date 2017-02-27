import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import Header from '../components/header';
import { QueueHistory } from '/lib/collections';
import QueueStatuses from '/lib/constants/queueStatuses';
import RouteNames from '/lib/constants/routeNames';

export const composer = ({ context }, onData) => {
    const images = context().providers.pageProvider.getImages();
    const userIsLogged = !!Meteor.user();
    const queueStarted = !!QueueHistory.findOne({
        status: QueueStatuses.started
    });
    const isInGame = (context().FlowRouter.current().route.name === RouteNames.game);
    onData(null, {
        userIsLogged,
        queueStarted,
        images,
        isInGame
    });
};

export const depsMapper = (context, actions) => ({
    context: () => context,
    switchLoginBoxState: actions.interfaceActions.switchLoginBoxState,
    goToHomePage: actions.interfaceActions.goToHomePage,
    logout: actions.userActions.logout
});

export default composeAll(
    composeWithTracker(composer),
    useDeps(depsMapper)
)(Header);
