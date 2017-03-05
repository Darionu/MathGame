import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import MainLayout from '../components/mainLayout';
import { Games } from '/lib/collections';
import { GameStatuses } from '/lib/constants/gameConstants';
import RouteNames from '/lib/constants/routeNames';

export const composer = ({ context }, onData) => {
    const gameInProgress = Games.findOne({
        status: {
            $in: [
                GameStatuses.created,
                GameStatuses.initialized,
                GameStatuses.started
            ]
        }
    });

    if (gameInProgress &&
        context().FlowRouter.current().route.name !== RouteNames.game) {
        context().FlowRouter.go(RouteNames.game);
    }

    if (!gameInProgress &&
        context().FlowRouter.current().route.name === RouteNames.game) {
        context().FlowRouter.go(RouteNames.home);
    }

    const finishedGameToRead = Games.findOne({
        status: GameStatuses.finished,
        read: false
    });

    if (finishedGameToRead &&
        context().FlowRouter.current().route.name !== RouteNames.gameResult) {
        context().FlowRouter.go(RouteNames.gameResult);
    }

    onData(null, {});
};

export const depsMapper = (context) => ({
    context: () => context
});

export default composeAll(
    composeWithTracker(composer),
    useDeps(depsMapper)
)(MainLayout);
