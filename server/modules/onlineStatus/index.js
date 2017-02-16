/**
 * Created by tomasz on 12.02.17.
 */
import Logger from '/lib/logging/Logger';
import publications from './publications';
import QueueManager from '../queue/index';

export default class OnlineStatus {
    constructor() {
        publications();
        Meteor.onConnection(function connectionHandler(connection) {
            const connectionId = connection.id;
            Logger.debug(`[OnlineStatus] Open connection with id: ${connectionId}`, __filename);
            connection.onClose(() => {
                const user = Meteor.users.findOne({ sessionIds: { $in: [connectionId] } });
                if (user && connectionId) {
                    QueueManager.removeUserFromQueue(user._id);
                    Logger.debug(`[OnlineStatus] Connection close for user id: ${user._id} and connection id: ${connectionId}`, __filename);
                }
            });
        });
    }
}
