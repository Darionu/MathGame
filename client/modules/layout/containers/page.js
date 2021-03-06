import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import Page from '../components/page';
import PublicationNames from '/lib/constants/publicationsNames';

export const composer = ({ context, page, saveCurrentLayout, switchLayout, switchLanguage }, onData) => {
    const localStorage = context().providers.localStorageProvider;
    const lastLayout = localStorage.getLayout();
    if (lastLayout) {
        switchLayout(lastLayout);
    }
    const lastLanguage = localStorage.getLanguage();
    if (lastLanguage) {
        switchLanguage(lastLanguage);
    }
    let pageComponent;
    try {
        pageComponent = context().providers.pageProvider.getPage(page);
    } catch (error) {
        switchLayout('default');
        saveCurrentLayout('default');
        pageComponent = context().providers.pageProvider.getPage(page);
    }

    Meteor.subscribe(PublicationNames.users).ready();
    if (Meteor && Meteor.user()) {
        Meteor.subscribe(PublicationNames.userData).ready();
        Meteor.subscribe(PublicationNames.userQueue).ready();
        Meteor.subscribe(PublicationNames.myStatus).ready();
        Meteor.subscribe(PublicationNames.userGames).ready();
        Meteor.subscribe(PublicationNames.userExercises).ready();
    }

    const texts = context().providers.pageProvider.getTexts();
    const images = context().providers.pageProvider.getImages();
    const sounds = context().providers.pageProvider.getSounds();
    onData(null, { pageComponent, texts, images, sounds });
};

export const depsMapper = (context, actions) => ({
    saveCurrentLayout: actions.authComposer.saveCurrentLayout,
    switchLayout: actions.authComposer.switchLayout,
    switchLanguage: actions.authComposer.switchLanguage,
    context: () => context
});

export default composeAll(
    composeWithTracker(composer),
    useDeps(depsMapper)
)(Page);
