'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const fs = require('fs');
const lang = {};
const available = 'en,pl';

available.split(',').forEach((item) => {
    lang[item] = require('../lang/' + item + '.json');
});

const delFiles = () => {
    return require('del')([
        '../lang/build',
        '../lang/build_tmp'
    ], { force: true });
};

gulp.task('lang:clean', delFiles);
gulp.task('lang:generate', ['lang:clean'], () => {
    return gulp.src('../client/**/*.js')
        .pipe($.babel({
            presets: [
                'es2015',
                'react'
            ],
            plugins: [
                ['react-intl', {
                    messagesDir: './../lang/build/msg'
                }]
            ]
        }))
        .pipe(gulp.dest('../lang/build_tmp'));
});

gulp.task('lang:concat', ['lang:generate'], () => {
    gulp.src('../lang/build/msg/**/*.json').pipe($.jsonConcat('lang.json', (data) => {
        const outputJson = {};
        for (const i in Object.keys(data)) {
            const fileName = Object.keys(data)[i];
            data[fileName].forEach((item) => {
                const id = item.id;
                const defaultMessage = item.defaultMessage;

                available.split(',').forEach((item) => {
                    if (item === 'en') {
                        if (lang[item][id] === undefined) {
                            lang[item][id] = defaultMessage;
                            outputJson[id] = defaultMessage;
                        }
                    }
                });
            });
        }

        available.split(',').forEach((item) => {
            fs.writeFileSync('../lang/' + item + '.json', JSON.stringify(lang[item], null, 2));
        });

        delFiles();

        return new Buffer(JSON.stringify(data));
    })).pipe(gulp.dest('../lang/dist'))
});

gulp.task('versionPropagate', () => {
    // Read the versions.
    const packageJson = require('../package.json');
    const version = packageJson.version;
    const mobileVersion = packageJson.mobileVersion;
    console.log(`Versions set in package.json: backend-${version}, client-${mobileVersion}`);

    // Server
    let fileContents;
    fileContents = fs.readFileSync('../server/main.js', 'UTF-8');
    fileContents = fileContents.replace(/(Meteor\.backendVersion = )('\d+\.\d+\.\d+')/, `$1'${version}'`);
    fs.writeFileSync('../server/main.js', fileContents);
    console.log(`updated /server/main.js - set Meteor.backendVersion to ${version}`);

    // Client
    fileContents = fs.readFileSync('../client/main.js', 'UTF-8');
    fileContents = fileContents.replace(/(Meteor\.clientVersion = )('\d+\.\d+\.\d+')/, `$1'${mobileVersion}'`);
    fs.writeFileSync('../client/main.js', fileContents);
    console.log(`updated /client/main.js - set Meteor.clientVersion to ${mobileVersion}`);
});
