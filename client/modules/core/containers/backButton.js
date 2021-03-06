import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import BackButton from '../components/backButton';

export const composer = ({ context }, onData) => {
    onData(null, {

    });
};

export const depsMapper = (context, actions) => ({
    context: () => context,
    goToSpecificRoute: actions.interfaceActions.goToSpecificRoute
});

export default composeAll(
    composeWithTracker(composer),
    useDeps(depsMapper)
)(BackButton);
