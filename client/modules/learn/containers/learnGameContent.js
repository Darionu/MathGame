import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import LearnGameContent from '../components/learnGameContent';

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
)(LearnGameContent);
