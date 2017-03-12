import GameManager from './index';
import Logger from '/lib/logging/Logger';
import PlayersManager from './index';

/**
 * Methods related to GameSystem to be called from the client.
 */
export default () => {
    Meteor.methods({
        /**
         *
         */
        createTempAccount: function (language) {
            check(language, String);
            return PlayersManager.createTemporaryUser(this.connection.id, language);
        }
    });
};
