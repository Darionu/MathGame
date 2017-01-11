import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import LoginModal from '../components/loginModal';
import localStateKeys from '/lib/constants/localStateKeys';

export const composer = ({ context }, onData) => {
    const isLoginModalVisible = !!context().LocalState.get(localStateKeys.isLoginBoxVisible);
    onData(null, {
        isLoginModalVisible
    });
};

export const depsMapper = (context, actions) => ({
    context: () => context,
    switchLoginBoxState: actions.interfaceActions.switchLoginBoxState
});

export default composeAll(
    composeWithTracker(composer),
    useDeps(depsMapper)
)(LoginModal);
