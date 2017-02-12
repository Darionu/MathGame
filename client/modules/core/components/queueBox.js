import React from 'react';
import styles from './styles/queueBox.scss';
import { defineMessages, intlShape, injectIntl } from 'react-intl';
import moment from 'moment';

import TimeConstants from '/lib/constants/timeConstants';
import Button from '/client/modules/core/components/button';

const messages = defineMessages({
    inQueue: {
        id: 'app.queueBox.inQueue',
        defaultMessage: 'In queue'
    }
});

const QueueBox = class extends React.Component {
    constructor() {
        super();
        this.state = {
            time: 0
        }
    }

    componentDidMount() {
        this.timeInterval = setInterval(() => {
            if (this.props.startingTime) {
                const currentDate = new Date();
                const difference = moment.duration(moment(currentDate).diff(moment(this.props.startingTime)));
                this.setState({ time: difference.asSeconds()})
            }
        }, TimeConstants.oneSecond);
    }

    componentWillUnmount() {
        clearInterval(this.timeInterval);
    }

    getParsedTime() {
        return moment().startOf('day')
            .seconds(this.state.time)
            .format('mm:ss');
    }

    render() {
        const { formatMessage } = this.props.intl;
        return (
            <div className={styles.queueBox}>
                <div className={styles.description}>{formatMessage(messages.inQueue)}: {this.getParsedTime()}</div>
                <Button className={styles.quitQueueButton} text="X" onClick={this.props.quitQueue}/>
            </div>
        );
    }
};

QueueBox.propTypes = {
    intl: intlShape.isRequired,
    startingTime: React.PropTypes.number,
    quitQueue: React.PropTypes.func.isRequired
};

export default injectIntl(QueueBox);
