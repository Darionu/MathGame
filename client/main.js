// Polyfilling Intl for Safari.
import 'intl';
import 'intl/locale-data/jsonp/en.js';
import 'intl/locale-data/jsonp/pl.js';

import { createApp } from 'mantra-core';
import initContext from './configs/context';
import { addLocaleData } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import plLocaleData from 'react-intl/locale-data/pl';

import coreModule from './modules/core';
import layoutModule from './modules/layout';
import rankingsModule from './modules/rankings';
import playBoardModule from './modules/playboard';
import learnModule from './modules/learn';

// Do not touch - this is updated by gulp.
Meteor.clientVersion = '0.1.0';

// modules

// init context
const context = initContext();

// LocaleData
addLocaleData(enLocaleData);
addLocaleData(plLocaleData);

// create app
const app = createApp(context);
app.loadModule(coreModule);
app.loadModule(layoutModule);
app.loadModule(rankingsModule);
app.loadModule(playBoardModule);
app.loadModule(learnModule);

app.init();
