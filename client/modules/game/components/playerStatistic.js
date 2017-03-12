import React from 'react';
import styles from './styles/playerStatistic.scss';
import { defineMessages, intlShape, injectIntl } from 'react-intl';
import UserName from '/client/modules/core/containers/userName';

const messages = defineMessages({
    youWon: {
        id: 'app.game.result.youWon',
        defaultMessage: 'YOU WON'
    },
    youLost: {
        id: 'app.game.result.youLost',
        defaultMessage: 'YOU LOST'
    },
    winner: {
        id: 'app.game.result.winner',
        defaultMessage: 'WINNER'
    },
    loser: {
        id: 'app.game.result.loser',
        defaultMessage: 'LOSER'
    },
    wins: {
        id: 'app.game.result.wins',
        defaultMessage: 'Wins'
    },
    loses: {
        id: 'app.game.result.loses',
        defaultMessage: 'Loses'
    },
    points: {
        id: 'app.game.result.points',
        defaultMessage: 'Points'
    },
    averageTime: {
        id: 'app.game.result.averageTime',
        defaultMessage: 'Average answer time'
    },
    answers: {
        id: 'app.game.result.answers',
        defaultMessage: 'Answers'
    },
    correct: {
        id: 'app.game.result.correct',
        defaultMessage: 'Correct'
    },
    wrong: {
        id: 'app.game.result.wrong',
        defaultMessage: 'Wrong'
    }
});

const PlayerStatistic = class extends React.Component {
    getWinMessage() {
        const { formatMessage } = this.props.intl;
        return (
            <span className={`${styles.result} ${styles.resultWon}`}>
                {formatMessage(messages.winner)}
            </span>
        );
    }

    getLoseMessage() {
        const { formatMessage } = this.props.intl;
        return (
            <span className={`${styles.result} ${styles.resultLost}`}>
                {formatMessage(messages.loser)}
            </span>
        );
    }

    getWins() {
        const { formatMessage } = this.props.intl;
        const wins = this.props.isWinner && !this.props.isGameAgainstBot
            ? this.props.player.gameData.wins - 1
            : this.props.player.gameData.wins;
        const pointDifference = this.props.isGameAgainstBot ? '+0' : '+1';
        return (
            <div>
                <span className={styles.resultWon}>{formatMessage(messages.wins)}:</span> {wins}
                {this.props.isWinner
                    ? <div className={styles.singleLine}>
                        (<span className={styles.resultWon}>{pointDifference}</span>)
                      </div>
                    : null
                }
            </div>
        );
    }

    getLoses() {
        const { formatMessage } = this.props.intl;
        const loses = !this.props.isWinner || !this.props.isGameAgainstBot
            ? this.props.player.gameData.loses - 1
            : this.props.player.gameData.loses;
        const pointDifference = this.props.isGameAgainstBot ? '+0' : '+1';
        return (
            <div>
                <span className={styles.resultLost}>{formatMessage(messages.loses)}:</span> {loses}
                {this.props.isWinner
                    ? null
                    : <div className={styles.singleLine}>
                        (<span className={styles.resultLost}>{pointDifference}</span>)
                      </div>
                }
            </div>
        );
    }

    render() {
        const { formatMessage } = this.props.intl;
        return (
            <div className={styles.playerStatistic}>
                {this.props.isWinner
                    ? this.getWinMessage()
                    : this.getLoseMessage()
                }

                <UserName
                    userId={this.props.playerId}
                    className={styles.userName}
                    hideScore
                />

                <div className={styles.gameCount}>
                    <span className={styles.stat}>
                        {this.getWins()}
                    </span>
                    <span className={styles.stat}>
                        {this.getLoses()}
                    </span>
                </div>

                <div className={styles.gameStatistics}>
                    <span className={styles.gameStat}>
                        {formatMessage(messages.points)}: {this.props.playerData.points}
                    </span>
                    <span className={`${styles.gameStat} ${styles.space}`}>
                        {formatMessage(messages.averageTime)}: {this.props.playerData.averageTime} s
                    </span>
                    <span className={styles.gameStat}>
                          {formatMessage(messages.answers)}: {this.props.playerData.answers}
                    </span>
                    <span className={styles.gameStat}>
                          {formatMessage(messages.correct)}: {this.props.playerData.correct}
                    </span>
                    <span className={styles.gameStat}>
                        {formatMessage(messages.wrong)}: {this.props.playerData.wrong}
                    </span>
                </div>
            </div>
        );
    }
};

PlayerStatistic.propTypes = {
    intl: intlShape.isRequired,
    isWinner: React.PropTypes.bool.isRequired,
    player: React.PropTypes.object.isRequired,
    playerData: React.PropTypes.object.isRequired,
    isGameAgainstBot: React.PropTypes.bool
};

export default injectIntl(PlayerStatistic);
