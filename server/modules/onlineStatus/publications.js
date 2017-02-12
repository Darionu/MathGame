import PublicationNames from '/lib/constants/publicationsNames';
import Logger from '/lib/logging/Logger';
import QueueManager from '../queue/index';

export default function () {
    Meteor.publish(PublicationNames.myStatus, function myStatus() {
        if (this.userId) {
            Logger.debug(`Start publication for user id: ${this.userId} with connection id: ${this.connection.id}`, __filename);
            this.onStop(() => {
                QueueManager.removeUserFromQueue(this.userId);
                Logger.debug(`Close publication for user id: ${this.userId} with connection id: ${this.connection.id}`, __filename);
            });
        }
        this.ready();
    });
}
