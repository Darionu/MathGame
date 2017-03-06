import React from 'react';
import styles from './styles/gameResultContent.scss';
import { defineMessages, intlShape, injectIntl } from 'react-intl';
import AvatarCircle from '/client/modules/core/components/avatarCircle';

const messages = defineMessages({
    youWon: {
        id: 'app.homePage.youWon',
        defaultMessage: 'YOU WON'
    },
    youLost: {
        id: 'app.homePage.youLost',
        defaultMessage: 'YOU LOST'
    },
    winner: {
        id: 'app.homePage.winner',
        defaultMessage: 'WINNER'
    },
    loser: {
        id: 'app.homePage.loser',
        defaultMessage: 'LOSER'
    }
});

const GameResultContent = class extends React.Component {
    constructor(props) {
        super(props);
    }

    getGameResult() {
        const { formatMessage } = this.props.intl;
        return this.props.isWin
            ? formatMessage(messages.youWon)
            : formatMessage(messages.youLost);
    }

    getPlayerResult(player) {
        const { formatMessage } = this.props.intl;
        return this.props[player].isWinner
            ?   formatMessage(messages.winner)
            :   formatMessage(messages.loser)
    }

    getResultClass() {
        return this.props.isWin
            ?   styles.resultWon
            :   styles.resultLost
    }

    getPlayerResultClass(player) {
        return this.props[player].isWinner
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
                        <div className={styles.statsContent}>
                            <AvatarCircle image={this.props.playerA.avatar} />
                            <span className={styles.playerUsername}>
                                {this.props.playerA.username}
                            </span>
                            <span className={`${styles.playerResult} ${this.getPlayerResultClass("playerA")}`}>
                                {this.getPlayerResult("playerA")}
                            </span>
                        </div>
                    </div>
                    <div className={styles.statsRight}>
                        <div className={styles.statsContent}>
                            <AvatarCircle image={this.props.playerB.avatar} />
                            <span className={styles.playerUsername}>
                                {this.props.playerB.username}
                            </span>
                            <span className={`${styles.playerResult} ${this.getPlayerResultClass("playerB")}`}>
                                {this.getPlayerResult("playerB")}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

GameResultContent.propTypes = {
    intl: intlShape.isRequired
};

export default injectIntl(GameResultContent);
