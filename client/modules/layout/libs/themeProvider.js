import $pages from '../components/pages/index';
import $themesDefaults from '../configs/themesDefaults';
import localStateKeys from '/lib/constants/localStateKeys';

export class ThemeProvider {
    constructor({ LocalState }, themes) {
        this._localState = LocalState;
        this._themes = themes;
    }

    getCurrentTheme() {
        this._defaults = this._themes.defaults;
        this._pages = this._themes.pages;
    }
    getPage(page) {
        this.getCurrentTheme();
        const layout = this._localState.get(localStateKeys.layout);
        if (!this._defaults) {
            throw Error(`No such layout (${layout}) defined in themesDefault.`);
        }
        let version = 0;
        if (this._defaults[layout].pageVersions[page]) {
            version = this._defaults[layout].pageVersions[page] - 1;
        }
        return this._pages[page][version];
    }

    getTexts() {
        const layout = this._localState.get(localStateKeys.layout);
        return this._defaults[layout].texts;
    }

    getImages() {
        const layout = this._localState.get(localStateKeys.layout);
        return this._defaults[layout].images;
    }

    getSounds() {
        const layout = this._localState.get(localStateKeys.layout);
        return this._defaults[layout].sounds;
    }
}

const themesPagesAndDefaults = {
    pages: $pages,
    defaults: $themesDefaults
};

export default (context) => new ThemeProvider(
    context,
    themesPagesAndDefaults
);
