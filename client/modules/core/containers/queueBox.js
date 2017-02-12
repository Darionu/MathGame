import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import QueueBox from '../components/queueBox';
import { QueueHistory } from '/lib/collections';
import QueueStatuses from '/lib/constants/queueStatuses';

export const composer = ({ context }, onData) => {
    const queueObject = QueueHistory.findOne({
        status: QueueStatuses.started
    });

    let startingTime = 0;
    if (queueObject) {
        startingTime = Date.parse(queueObject.startDate);
    }

    onData(null, {
        queueObject,
        startingTime
    });
};

export const depsMapper = (context, actions) => ({
    context: () => context,
    quitQueue: actions.queueActions.quitQueue
});

export default composeAll(
    composeWithTracker(composer),
    useDeps(depsMapper)
)(QueueBox);
