import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import RankingsContent from '../components/rankingsContent';

export const composer = ({}, onData) => {
    onData(null, {});
};

export const depsMapper = (context, actions) => ({
    context: () => context
});

export default composeAll(
    composeWithTracker(composer),
    useDeps(depsMapper)
)(RankingsContent);
