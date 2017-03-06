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

    const isWin = Meteor.userId() === game.winnerId;

    const firstPlayer = Meteor.users.findOne(game.playerA.id);
    const secondPlayer = Meteor.users.findOne(game.playerB.id);

    const playerA = {
        avatar: images.avatars[firstPlayer.userData.avatar],
        username: firstPlayer.username,
        isWinner: firstPlayer._id === game.winnerId
    };

    const playerB = {
        avatar: images.avatars[secondPlayer.userData.avatar],
        username: secondPlayer.username,
        isWinner: secondPlayer._id === game.winnerId
    };

    onData(null, {
        images,
        game,
        isWin,
        playerA,
        playerB
    });
};

export const depsMapper = (context, actions) => ({
    context: () => context
});

export default composeAll(
    composeWithTracker(composer),
    useDeps(depsMapper)
)(GameResultContent);
