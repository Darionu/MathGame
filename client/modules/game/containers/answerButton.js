import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import AnswerButton from '../components/answerButton';

export const composer = ({}, onData) => {
    onData(null, {});
};

export const depsMapper = (context) => ({
    context: () => context
});

export default composeAll(
    composeWithTracker(composer),
    useDeps(depsMapper)
)(AnswerButton);
