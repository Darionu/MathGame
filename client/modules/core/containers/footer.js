import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import Footer from '../components/footer';

export const composer = ({ context }, onData) => {
    const images = context().providers.pageProvider.getImages();
    const isLanguageContainerHidden = !!Meteor.userId();
    onData(null, {
        images,
        isLanguageContainerHidden
    });
};

export const depsMapper = (context, actions) => ({
    context: () => context,
    setLanguage: actions.interfaceActions.setLanguage
});

export default composeAll(
    composeWithTracker(composer),
    useDeps(depsMapper)
)(Footer);
