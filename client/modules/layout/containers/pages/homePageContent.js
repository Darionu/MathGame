import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import homePageContent from '../../components/pages/home/homePageContent';

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
)(homePageContent);
