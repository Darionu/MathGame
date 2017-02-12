import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import GameTypeItem from '../components/gameTypeItem';

export const composer = ({ context }, onData) => {
    onData(null, {});
};

export const depsMapper = (context, actions) => ({
    context: () => context,
    joinQueue: actions.queueActions.joinQueue
});

export default composeAll(
    composeWithTracker(composer),
    useDeps(depsMapper)
)(GameTypeItem);
