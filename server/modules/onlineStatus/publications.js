import PublicationNames from '/lib/constants/publicationsNames';
import Logger from '/lib/logging/Logger';
import QueueManager from '../queue';
import GameManager from '../game';
import PlayersManager from '../players';

export default function () {
    Meteor.publish(PublicationNames.myStatus, function myStatus() {
        if (this.userId) {
            const connectionId = this.connection.id;
            Meteor.users.update(this.userId, {
                $set: { status: { online: true } },
                $addToSet: { sessionIds: connectionId }
            });
            Logger.debug(
                `[OnlineStatus] Start publication for user id: ${this.userId} with connection id: ${this.connection.id}`,
                __filename
            );
            this.onStop(() => {
                QueueManager.removeUserFromQueue(this.userId);
                GameManager.forfeitGame(this.userId);
                Meteor.users.update(this.userId, {
                    $pull: {
                        sessionIds: connectionId
                    }
                });
                PlayersManager.deleteTemporaryUser(this.userId);
                Logger.debug(
                    `[OnlineStatus] Close publication for user id: ${this.userId} with connection id: ${this.connection.id}`,
                    __filename
                );
            });
        }
        this.ready();
    });
}
