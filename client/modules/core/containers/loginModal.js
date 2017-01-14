import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import LoginModal from '../components/loginModal';
import localStateKeys from '/lib/constants/localStateKeys';

export const composer = ({ context }, onData) => {
    const isLoginModalVisible = !!context().LocalState.get(localStateKeys.isLoginBoxVisible);
    const images = context().providers.pageProvider.getImages();

    onData(null, {
        isLoginModalVisible,
        images
    });
};

export const depsMapper = (context, actions) => ({
    context: () => context,
    switchLoginBoxState: actions.interfaceActions.switchLoginBoxState,
    loginAttempt: actions.userActions.loginAttempt,
    registerAttempt: actions.userActions.registerAttempt
});

export default composeAll(
    composeWithTracker(composer),
    useDeps(depsMapper)
)(LoginModal);
