import publications from './publications';
import methods from './methods';
import dbMigrations from './configs/dbMigrations';
import Logging from './modules/logging';

// Do not touch - this is updated by gulp.
Meteor.backendVersion = '0.1.0';

publications();
methods();

Meteor.startup(() => {
    dbMigrations();
});

new Logging();
