import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import PlayerStatistic from '../components/playerStatistic';
import { Games } from '/lib/collections';

export const composer = ({ playerId, gameId }, onData) => {
    const player = Meteor.users.findOne(playerId);
    const game = Games.findOne(gameId);
    const playerType = playerId === game.playerA.id ? "playerA" : "playerB";
    const playerData = game[playerType];

    onData(null, {
        player,
        playerData
    });
};

export const depsMapper = (context, actions) => ({
    context: () => context
});

export default composeAll(
    composeWithTracker(composer),
    useDeps(depsMapper)
)(PlayerStatistic);
