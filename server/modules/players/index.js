import { QueueHistory } from '/lib/collections/index';
import QueueStatuses from '/lib/constants/queueStatuses';
import Logger from '/lib/logging/Logger';
import methods from './methods';
import AccountTypes from '/lib/constants/accountTypes';

/**
 * UsersManager
 *
 * This class is responsible for logic around players.
 */
export default new class {
    constructor() {
        methods();
    }

    createTemporaryUser(connectionId, language) {
        const userId = Accounts.createUser({
            username: connectionId,
            password: connectionId
        });

        Meteor.users.update(userId, {
            $set: {
                userData: {
                    accountType: AccountTypes.temporary,
                    language: language,
                    avatar: 'tiger'
                },
                gameData: {
                    wins: 0,
                    loses: 0
                }
            }
        });

        return {
            login: connectionId,
            password: connectionId
        };
    }

    deleteTemporaryUser(userId) {
        Meteor.users.remove({
            _id: userId,
            "userData.accountType": AccountTypes.temporary
        });
    }

};
