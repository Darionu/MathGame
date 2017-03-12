import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import OpponentTypeSelect from '../components/opponentTypeSelect';
import LocalStateKeys from '/lib/constants/localStateKeys';
import OpponentTypes from '/lib/constants/opponentTypes';

export const composer = ({ context }, onData) => {
    const opponentType = Meteor.user()
        ? context().LocalState.get(LocalStateKeys.chosenOpponent)
        : OpponentTypes.bot;
    onData(null, {
        opponentType
    });
};

export const depsMapper = (context, actions) => ({
    context: () => context,
    toggleOpponentType: actions.queueActions.toggleOpponentType
});

export default composeAll(
    composeWithTracker(composer),
    useDeps(depsMapper)
)(OpponentTypeSelect);
