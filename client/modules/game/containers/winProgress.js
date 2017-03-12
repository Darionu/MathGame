import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import WinProgress from '../components/winProgress';

export const composer = ({ context, playerId }, onData) => {
    const images = context().providers.pageProvider.getImages();
    const player = Meteor.users.findOne(playerId);

    if (images && player) {
        onData(null, {
            images,
            player
        });
    }
};

export const depsMapper = (context, actions) => ({
    context: () => context
});

export default composeAll(
    composeWithTracker(composer),
    useDeps(depsMapper)
)(WinProgress);
