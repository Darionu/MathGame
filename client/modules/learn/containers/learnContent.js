import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import LearnContent from '../components/learnContent';

export const composer = ({ context }, onData) => {
    const images = context().providers.pageProvider.getImages();
    onData(null, {
        images
    });
};

export const depsMapper = (context, actions) => ({
    context: () => context,
    goToGamePage: actions.learnActions.goToGamePage,
    goToMathPage: actions.learnActions.goToMathPage
});

export default composeAll(
    composeWithTracker(composer),
    useDeps(depsMapper)
)(LearnContent);
