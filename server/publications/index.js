import { Meteor } from 'meteor/meteor';
import PublicationNames from '/lib/constants/publicationsNames';
import { QueueHistory } from '/lib/collections';

export default () => {
    Meteor.publish(PublicationNames.users, () => Meteor.users.find());
    Meteor.publish(PublicationNames.userQueue, function() {
        return QueueHistory.find({ userId: this.userId });
    });
};
