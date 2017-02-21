import { Meteor } from 'meteor/meteor';
import PublicationNames from '/lib/constants/publicationsNames';
import { QueueHistory, Games } from '/lib/collections';

export default () => {
    Meteor.publish(PublicationNames.users, () => Meteor.users.find());
    Meteor.publish(PublicationNames.userQueue, function() {
        return QueueHistory.find({ userId: this.userId });
    });
    Meteor.publish(PublicationNames.userGames, function() {
        return Games.find({
            $or: [
                { playerA: this.userId },
                { playerB: this.userId }
            ]
        })
    });
};
