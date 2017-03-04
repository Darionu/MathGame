import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import RankingsContent from '../components/rankingsContent';

export const composer = ({ context }, onData) => {
    const images = context().providers.pageProvider.getImages();
    const userData = [];
    Meteor.users.find({}, {
        fields: {
            username: 1,
            gameData: 1,
            userData: 1
        }
    }).forEach((user) => {
        if (user.userData && user.gameData) {

            userData.push({
                avatar: images.avatars[user.userData.avatar],
                player: user.username,
                wins: user.gameData.wins,
                loses: user.gameData.loses
            });
        }
    });

    onData(null, {
        userData
    });
};

export const depsMapper = (context, actions) => ({
    context: () => context
});

export default composeAll(
    composeWithTracker(composer),
    useDeps(depsMapper)
)(RankingsContent);
