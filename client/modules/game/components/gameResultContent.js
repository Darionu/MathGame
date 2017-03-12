import React from 'react';
import styles from './styles/gameResultContent.scss';
import { defineMessages, intlShape, injectIntl } from 'react-intl';
import GameResultPlayerStat from '/client/modules/game/containers/playerStatistic';
import Button from '/client/modules/core/components/button';

const messages = defineMessages({
    youWon: {
        id: 'app.game.result.youWon',
        defaultMessage: 'YOU WON'
    },
    youLost: {
        id: 'app.game.result.youLost',
        defaultMessage: 'YOU LOST'
    },
    backPlayboard: {
        id: 'app.game.result.backPlayboard',
        defaultMessage: 'Back to playboard'
    },
    gameWithBot: {
        id: 'app.game.result.gameWithBot',
        defaultMessage: 'You played against bot opponent. The win/loss will not be added to your account.'
    }
});

const GameResultContent = class extends React.Component {
    componentWillUnmount() {
        if (this.props.game) {
            this.props.markResultScreenAsSeen(this.props.game._id);
        }
    }

    getGameResult() {
        const { formatMessage } = this.props.intl;
        return this.props.isWin
            ? formatMessage(messages.youWon)
            : formatMessage(messages.youLost);
    }

    getResultClass() {
        return this.props.isWin
            ?   styles.resultWon
            :   styles.resultLost
    }

    render() {
        const { formatMessage } = this.props.intl;
        return (
            <div className={styles.gameResultContent}>
                <div className={`${this.getResultClass()} ${styles.header}`}>
                    {this.getGameResult()}
                </div>
                <div className={styles.content}>
                    <div className={styles.statsLeft}>
                        <GameResultPlayerStat
                            isWinner={this.props.playerA.isWinner}
                            playerId={this.props.playerA.id}
                            gameId={this.props.game._id}
                            isGameAgainstBot={this.props.isGameAgainstBot}
                        />
                    </div>
                    <div className={styles.statsRight}>
                        <GameResultPlayerStat
                            isWinner={this.props.playerB.isWinner}
                            playerId={this.props.playerB.id}
                            gameId={this.props.game._id}
                        />
                    </div>
                    {this.props.isGameAgainstBot
                        ? <span className={styles.gameWithBot}>{`* ${formatMessage(messages.gameWithBot)}`}</span>
                        : null
                    }
                </div>
                <div className={styles.bottom}>
                    <Button
                        text={`< ${formatMessage(messages.backPlayboard)}`}
                        overrideDefault
                        className={styles.button}
                        onClick={this.props.goToPlayBoard}
                    />
                </div>
            </div>
        );
    }
};

GameResultContent.propTypes = {
    intl: intlShape.isRequired,
    isWin: React.PropTypes.bool.isRequired,
    game: React.PropTypes.object.isRequired,
    playerA: React.PropTypes.object.isRequired,
    playerB: React.PropTypes.object.isRequired,
    goToPlayBoard: React.PropTypes.func.isRequired,
    isGameAgainstBot: React.PropTypes.bool.isRequired
};

export default injectIntl(GameResultContent);
