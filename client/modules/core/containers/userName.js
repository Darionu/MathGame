import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import UserName from '../components/userName';

export const composer = ({ context, userId }, onData) => {
    const user = userId
        ? Meteor.users.findOne(userId)
        : Meteor.user();
    let userAvatar = '';
    let statistics = {
        wins: '?',
        loses: '?'
    };

    if (user && user.userData && user.userData.avatar) {
        const images = context().providers.pageProvider.getImages();
        userAvatar = images.avatars[user.userData.avatar];
    }

    if (user && user.gameData) {
        statistics = {
            wins: user.gameData.wins,
            loses: user.gameData.loses
        }
    }

    onData(null, {
        user,
        userAvatar,
        statistics
    });
};

export const depsMapper = (context, actions) => ({
    context: () => context
});

export default composeAll(
    composeWithTracker(composer),
    useDeps(depsMapper)
)(UserName);
