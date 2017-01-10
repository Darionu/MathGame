import LocalStorageConstants from '/lib/constants/localStorageConstants';

export default class LocalStorage {
    constructor() {
        // To be compatible we will user Meteor._localStorage which normally points to
        // window.LocalStorage anyway. On Desktop however we are replacing Meteor._localStorage with
        // our own implementation.
        this.storage = Meteor._localStorage;
    }

    getLayout() {
        return this.storage.getItem(LocalStorageConstants.layout);
    }

    setLayout(layout) {
        this.storage.setItem(LocalStorageConstants.layout, layout);
    }

    clearLayout() {
        this.storage.removeItem(LocalStorageConstants.layout);
    }

    getLanguage() {
        return this.storage.getItem(LocalStorageConstants.language);
    }

    setLanguage(language) {
        this.storage.setItem(LocalStorageConstants.language, language);
    }
}
