import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import MainLayout from '../components/mainLayout';

export const composer = ({ context }, onData) => {
    let ready = true;

    const data = {
        ready
    };
    onData(null, data);
};

export const depsMapper = (context) => ({
    context: () => context
});

export default composeAll(
    composeWithTracker(composer),
    useDeps(depsMapper)
)(MainLayout);
