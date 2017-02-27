import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import Equation from '../components/equation';

export const composer = ({ context }, onData) => {
    const images = context().providers.pageProvider.getImages();
    onData(null, {
        images
    });
};

export const depsMapper = (context, actions) => ({
    context: () => context
});

export default composeAll(
    composeWithTracker(composer),
    useDeps(depsMapper)
)(Equation);
