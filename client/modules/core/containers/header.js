import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import Header from '../components/header';

export const composer = ({}, onData) => {
    onData(null, {});
};

export const depsMapper = (context, actions) => ({
    context: () => context,
    switchLoginBoxState: actions.interfaceActions.switchLoginBoxState,
    goToHomePage: actions.interfaceActions.goToHomePage
});

export default composeAll(
    composeWithTracker(composer),
    useDeps(depsMapper)
)(Header);
