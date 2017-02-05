import React from 'react';
import { defineMessages, intlShape, injectIntl } from 'react-intl';
import styles from './playBoardContent.scss';
import GameTypeItem from '/client/modules/playboard/containers/gameTypeItem';

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
                        <GameTypeItem icon={this.props.images.mathSigns.plus} title={formatMessage(messages.addition)}/>
                    </div>
                    <div className={styles.gameType}>
                        <GameTypeItem icon={this.props.images.mathSigns.subtract} title={formatMessage(messages.subtraction)}/>
                    </div>
                    <div className={styles.gameType}>
                        <GameTypeItem icon={this.props.images.mathSigns.multiply} title={formatMessage(messages.multiplication)}/>
                    </div>
                    <div className={styles.gameType}>
                        <GameTypeItem icon={this.props.images.mathSigns.divide} title={formatMessage(messages.division)}/>
                    </div>
                    <img className={styles.lion} src={this.props.images.lion}/>
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
