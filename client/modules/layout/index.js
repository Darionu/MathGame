import ThemeProvider from './libs/themeProvider';
import ComponentProvider from './libs/componentProvider';
import LocalStorage from '../core/libs/localStorage';

export default {
    load(context) {
        const providers = context.providers;
        providers.componentProvider = new ComponentProvider(context);
        providers.pageProvider = new ThemeProvider(context);
        providers.localStorageProvider = new LocalStorage();
    }
};
