import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import PaperImage from '../components/paperImage';

export const composer = ({}, onData) => {
    onData(null, {});
};

export const depsMapper = (context) => ({
    context: () => context
});

export default composeAll(
    composeWithTracker(composer),
    useDeps(depsMapper)
)(PaperImage);
