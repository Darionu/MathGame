import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import homePageContent from '../../components/pages/home/homePageContent';

export const composer = ({ context }, onData) => {
    const images = context().providers.pageProvider.getImages();

    onData(null, {
        images
    });
};

export const depsMapper = (context, actions) => ({
    context: () => context,
    goToRankings: actions.interfaceActions.goToRankings,
    goToPlayBoard: actions.interfaceActions.goToPlayBoard,
    goToLearn: actions.interfaceActions.goToLearn
});

export default composeAll(
    composeWithTracker(composer),
    useDeps(depsMapper)
)(homePageContent);
