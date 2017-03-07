import React from 'react';
import styles from './styles/rankingTable.scss';
import { defineMessages, intlShape, injectIntl } from 'react-intl';
import AvatarCircle from '/client/modules/core/components/avatarCircle';

const messages = defineMessages({
    position: {
        id: 'app.rankings.position',
        defaultMessage: 'Position'
    },
    player: {
        id: 'app.rankings.player',
        defaultMessage: 'Player'
    },
    wins: {
        id: 'app.rankings.wins',
        defaultMessage: 'Wins'
    },
    loses: {
        id: 'app.rankings.loses',
        defaultMessage: 'Loses'
    }
});

const RankingTable = class extends React.Component {
    renderRow(element, index) {
        return (
            <tr key={element.player}>
                <td className={styles.textCenter}>
                    {index+1}.
                </td>
                <td className={styles.textLeft}>
                    <AvatarCircle
                        className={styles.avatar}
                        image={element.avatar}
                    />
                    <span className={styles.playerName}>
                            {element.player}
                    </span>
                </td>

                <td className={styles.textCenter}>
                    {element.wins}
                </td>
                <td className={styles.textCenter}>
                    {element.loses}
                </td>
            </tr>
        );
    }

    render() {
        const { formatMessage } = this.props.intl;
        return (
            <div className={styles.rankingTable}>
                <table className={styles.tableFill}>
                    <thead>
                        <tr>
                            <th className={styles.textCenter}>{formatMessage(messages.position)}</th>
                            <th className={styles.textCenter}>{formatMessage(messages.player)}</th>

                            <th className={styles.textCenter}>{formatMessage(messages.wins)}</th>
                            <th className={styles.textCenter}>{formatMessage(messages.loses)}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.rows.map((element, index) => {
                            return this.renderRow(element, index);
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
};

RankingTable.propTypes = {
    intl: intlShape.isRequired,
    rows: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};

export default injectIntl(RankingTable);
