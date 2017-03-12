import React from 'react';
import { defineMessages, intlShape, injectIntl } from 'react-intl';
import styles from './playBoardContent.scss';
import GameTypeItem from '/client/modules/playboard/containers/gameTypeItem';
import OpponentTypeSelect from '/client/modules/playboard/containers/opponentTypeSelect';
import { GameTypes } from '/lib/constants/gameConstants';

const messages = defineMessages({
    subtraction: {
        id: 'app.playBoard.subtraction',
        defaultMessage: 'Subtraction'
    },
    addition: {
        id: 'app.playBoard.addition',
        defaultMessage: 'Addition'
    },
    multiplication: {
        id: 'app.playBoard.multiplication',
        defaultMessage: 'Multiplication'
    },
    division: {
        id: 'app.playBoard.division',
        defaultMessage: 'Division'
    }
});

const PlayBoardContent = class extends React.Component {
    render() {
        const { formatMessage } = this.props.intl;
        return (
            <div className={styles.wrapperContainer}>
                <div className={styles.gameTypesHolder}>
                    <div className={styles.gameType}>
                        <GameTypeItem
                            icon={this.props.images.mathSigns.plus}
                            title={formatMessage(messages.addition)}
                            gameType={GameTypes.addition}
                        />
                    </div>
                    <div className={styles.gameType}>
                        <GameTypeItem
                            icon={this.props.images.mathSigns.subtract}
                            title={formatMessage(messages.subtraction)}
                            gameType={GameTypes.subtraction}
                        />
                    </div>
                    <div className={styles.gameType}>
                        <GameTypeItem
                            icon={this.props.images.mathSigns.multiply}
                            title={formatMessage(messages.multiplication)}
                            gameType={GameTypes.multiplication}
                        />
                    </div>
                    <div className={styles.gameType}>
                        <GameTypeItem
                            icon={this.props.images.mathSigns.divide}
                            title={formatMessage(messages.division)}
                            gameType={GameTypes.division}
                        />
                    </div>
                    <OpponentTypeSelect/>
                    <img
                        className={styles.lion}
                        src={this.props.images.lion}
                    />
                    <div className={styles.dummy}/>
                </div>
            </div>
        );
    }
};

PlayBoardContent.propTypes = {
    intl: intlShape.isRequired,
    images: React.PropTypes.object
};

export default injectIntl(PlayBoardContent);
