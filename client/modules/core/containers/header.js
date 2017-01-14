import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import Header from '../components/header';

export const composer = ({ }, onData) => {
    const userIsLogged = !!Meteor.user();
    onData(null, {
        userIsLogged
    });
};

export const depsMapper = (context, actions) => ({
    context: () => context,
    switchLoginBoxState: actions.interfaceActions.switchLoginBoxState,
    goToHomePage: actions.interfaceActions.goToHomePage,
    logout: actions.userActions.logout
});

export default composeAll(
    composeWithTracker(composer),
    useDeps(depsMapper)
)(Header);
