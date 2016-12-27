import { Meteor } from 'meteor/meteor';
import PublicationNames from '/lib/constants/publicationsNames';

export default () => {
    Meteor.publish(PublicationNames.users, () => Meteor.users());
}
