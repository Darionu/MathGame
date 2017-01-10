import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import Footer from '../components/footer';

export const composer = ({}, onData) => {
    onData(null, {});
};

export const depsMapper = (context) => ({
    context: () => context
});

export default composeAll(
    composeWithTracker(composer),
    useDeps(depsMapper)
)(Footer);
