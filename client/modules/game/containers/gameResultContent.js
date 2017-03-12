import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import GameResultContent from '../components/gameResultContent';
import { Games } from '/lib/collections';
import { GameStatuses } from '/lib/constants/gameConstants';
import RouteNames from '/lib/constants/routeNames';
import OpponentTypes from '/lib/constants/opponentTypes';

export const composer = ({ context }, onData) => {
    const game = Games.findOne({
        status: GameStatuses.finished,
        $or: [
            {
                $and: [
                    { "playerA.id": Meteor.userId() },
                    { "playerA.read": false }
                ]
            }, {
                $and: [
                    { "playerB.id": Meteor.userId() },
                    { "playerB.read": false }
                ]
            }
        ]
    });

    if (!game) {
        context().FlowRouter.go(RouteNames.playBoard);
        return;
    }

    const isWin = Meteor.userId() === game.winnerId;
    const firstPlayer = Meteor.users.findOne(game.playerA.id);
    const secondPlayer = Meteor.users.findOne(game.playerB.id);

    const playerA = {
        id: game.playerA.id,
        isWinner: firstPlayer._id === game.winnerId
    };

    const playerB = {
        id: game.playerB.id,
        isWinner: secondPlayer._id === game.winnerId
    };

    const isGameAgainstBot = (playerB.id === OpponentTypes.bot);

    onData(null, {
        game,
        isWin,
        playerA,
        playerB,
        isGameAgainstBot
    });
};

export const depsMapper = (context, actions) => ({
    context: () => context,
    markResultScreenAsSeen: actions.gameActions.markResultScreenAsSeen,
    goToPlayBoard: actions.interfaceActions.goToPlayBoard
});

export default composeAll(
    composeWithTracker(composer),
    useDeps(depsMapper)
)(GameResultContent);
