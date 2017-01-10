import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import Header from '../components/header';

export const composer = ({}, onData) => {
    onData(null, {});
};

export const depsMapper = (context) => ({
    context: () => context
});

export default composeAll(
    composeWithTracker(composer),
    useDeps(depsMapper)
)(Header);
