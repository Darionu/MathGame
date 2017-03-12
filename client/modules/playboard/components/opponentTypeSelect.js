import React from 'react';
import styles from './styles/opponentTypeSelect.scss';
import { defineMessages, intlShape, injectIntl } from 'react-intl';
import OpponentTypes from '/lib/constants/opponentTypes';

const messages = defineMessages({
    yourOpponent: {
        id: 'app.playboard.yourOpponent',
        defaultMessage: 'Your opponent type'
    },
    player: {
        id: 'app.playboard.player',
        defaultMessage: 'PLAYER'
    },
    bot: {
        id: 'app.playboard.bot',
        defaultMessage: 'BOT'
    }
});

const OpponentTypeSelect = class extends React.Component {
    getButtonStyle() {
        return this.props.opponentType === OpponentTypes.bot
            ? styles.buttonWithBot
            : styles.buttonWithPlayer;
    }

    getButtonText() {
        const { formatMessage } = this.props.intl;
        return this.props.opponentType === OpponentTypes.bot
            ? formatMessage(messages.bot)
            : formatMessage(messages.player);
    }

    render() {
        const { formatMessage } = this.props.intl;
        return (
            <div className={styles.opponentTypeSelect}>
                <span className={styles.description}>
                    {formatMessage(messages.yourOpponent)}:
                </span>

                <button
                    className={this.getButtonStyle()}
                    onClick={this.props.toggleOpponentType}
                >
                    {this.getButtonText()}
                </button>
            </div>
        );
    }
};

OpponentTypeSelect.propTypes = {
    intl: intlShape.isRequired,
    toggleOpponentType: React.PropTypes.func.isRequired,
    opponentType: React.PropTypes.string.isRequired
};

export default injectIntl(OpponentTypeSelect);
