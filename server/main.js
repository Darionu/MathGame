import publications from './publications';
import methods from './methods';
import dbMigrations from './configs/dbMigrations';
import Logging from './modules/logging';
import OnlineStatus from './modules/onlineStatus';
import AccountTypes from '/lib/constants/accountTypes';

// Do not touch - this is updated by gulp.
Meteor.backendVersion = '0.1.0';

publications();
methods();

Meteor.startup(() => {
    dbMigrations();
});

Meteor.users.update({}, {
    $set: {
        sessionIds: []
    }
}, { multi: true });

Meteor.users.remove({
    "userData.accountType": AccountTypes.temporary
});

new Logging(); // eslint-disable-line no-new
new OnlineStatus(); // eslint-disable-line no-new
