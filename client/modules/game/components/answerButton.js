import React from 'react';
import Button from '/client/modules/core/components/button';
import styles from './styles/answerButton.scss';

const AnswerButton = class extends React.Component {
    sendAnswer() {
        this.props.sendAnswer(this.props.answer);
    }

    render() {
        return (
            <div className={styles.answerButton}>
                <Button
                    className={styles.answerButton}
                    text={this.props.answer.toString()}
                    onClick={::this.sendAnswer}
                />
            </div>
        );
    }
};

AnswerButton.propTypes = {
    answer: React.PropTypes.number,
    sendAnswer: React.PropTypes.func.isRequired
};

export default AnswerButton;
