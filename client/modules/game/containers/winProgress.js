import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import WinProgress from '../components/winProgress';

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
)(WinProgress);
