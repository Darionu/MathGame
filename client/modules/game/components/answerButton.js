import React from 'react';
import { defineMessages, intlShape, injectIntl } from 'react-intl';
import styles from './styles/answerButton.scss';

const messages = defineMessages({

});

const AnswerButton = class extends React.Component {
    render() {
        const { formatMessage } = this.props.intl;
        return (
            <div className={styles.answerButton}>
                {this.props.answer}
            </div>
        );
    }
};

AnswerButton.propTypes = {
    intl: intlShape.isRequired,
    answer: React.PropTypes.number
};

export default injectIntl(AnswerButton);
