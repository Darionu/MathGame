import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import ProgressBar from '../components/progressBar';

export const composer = ({ context }, onData) => {
    onData(null, {

    });
};

export const depsMapper = (context, actions) => ({
    context: () => context
});

export default composeAll(
    composeWithTracker(composer),
    useDeps(depsMapper)
)(ProgressBar);
