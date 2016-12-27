import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import LanguageProvider from '../components/languageProvider';
import en from '/lang/en.json';
import pl from '/lang/pl.json';
import localStateKeys from '/lib/constants/localStateKeys';
import moment from 'moment';
import 'moment/locale/en-gb.js';
import 'moment/locale/pl.js';

const langs = { en, pl };

export const composer = ({ context, langsMap }, onData) => {
    const language = context().LocalState.get(localStateKeys.language);
    const messages = langsMap[language];
    moment.locale(language);

    onData(null, { locale: language, messages });
};

export const depsMapper = (langsMap) => (context) => ({
    context: () => context,
    langsMap
});

export default composeAll(
    composeWithTracker(composer),
    useDeps(depsMapper(langs))
)(LanguageProvider);
