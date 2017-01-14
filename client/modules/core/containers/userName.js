import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import UserName from '../components/userName';

export const composer = ({ context }, onData) => {
    const user = Meteor.users.findOne({ _id: Meteor.userId() });
    let userAvatar = '';
    if (user && user.userData && user.userData.avatar) {
        const images = context().providers.pageProvider.getImages();
        userAvatar = images.avatars[user.userData.avatar];
    }
    onData(null, {
        user,
        userAvatar
    });
};

export const depsMapper = (context, actions) => ({
    context: () => context
});

export default composeAll(
    composeWithTracker(composer),
    useDeps(depsMapper)
)(UserName);
