import React from 'react';
import styles from './styles/gameBoard.scss';
import { defineMessages, intlShape, injectIntl } from 'react-intl';
import PaperImage from '/client/modules/core/containers/paperImage';

const messages = defineMessages({

});

const GameResultContent = class extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { formatMessage } = this.props.intl;
        return (
            <div className={styles.gameResultContent}>
                <PaperImage

                />
            </div>
        );
    }
};

GameResultContent.propTypes = {
    intl: intlShape.isRequired
};

export default injectIntl(GameResultContent);
