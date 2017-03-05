import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import LearnMathContent from '../components/learnMathContent';

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
)(LearnMathContent);
