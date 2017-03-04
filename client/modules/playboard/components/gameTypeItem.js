import React from 'react';
import styles from './styles/gameTypeItem.scss';
import Alert from 'react-s-alert';
import { defineMessages, intlShape, injectIntl } from 'react-intl';

const messages = defineMessages({
    mustBeOnline: {
        id: 'app.playboard.mustBeOnline',
        defaultMessage: 'You must be online to join the queue.'
    }
});

const GameTypeItem = class extends React.Component {
    joinQueue() {
        if (Meteor.userId()) {
            this.props.joinQueue(this.props.gameType);
        } else {
            const { formatMessage } = this.props.intl;
            Alert.warning(formatMessage(messages.mustBeOnline));
        }
    }

    render() {
        return (
            <div className={styles.gameTypeItem} onClick={::this.joinQueue}>
                <img className={styles.icon} src={this.props.icon}/>
                <div className={styles.container}>
                    <div className={styles.title}>{this.props.title}</div>
                </div>
            </div>
        );
    }
};

GameTypeItem.propTypes = {
    intl: intlShape.isRequired,
    joinQueue: React.PropTypes.func.isRequired,
    icon: React.PropTypes.string,
    title: React.PropTypes.string
};

export default injectIntl(GameTypeItem);
