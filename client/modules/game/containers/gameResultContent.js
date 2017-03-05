import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import GameResultContent from '../components/gameResultContent';
import { Games } from '/lib/collections';
import { GameStatuses } from '/lib/constants/gameConstants';
import RouteNames from '/lib/constants/routeNames';

export const composer = ({ context }, onData) => {
    const images = context().providers.pageProvider.getImages();
    const game = Games.findOne({
        status: GameStatuses.finished,
        read: false
    });

    if (!game) {
        context().FlowRouter.go(RouteNames.gameResult);
        return;
    }

    console.log(game);
    const isWin = Meteor.userId() === game.winnerId;
    console.log(isWin);
    onData(null, {
        images,
        game,
        isWin
    });
};

export const depsMapper = (context, actions) => ({
    context: () => context
});

export default composeAll(
    composeWithTracker(composer),
    useDeps(depsMapper)
)(GameResultContent);
