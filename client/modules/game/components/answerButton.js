import React from 'react';
import Button from '/client/modules/core/components/button';
import styles from './styles/answerButton.scss';

const AnswerButton = class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            answerMade: false,
            answerResult: undefined
        };

        ::this.markAnswer;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.disabled === false && nextProps.disabled !== this.props.disabled) {
            this.setState({
                answerMade: false,
                answerResult: undefined
            });
        }
    }

    isButtonDisabled(disabled) {
        return !!disabled && !this.state.answerMade;
    }

    markAnswer(answer) {
        this.setState({
            answerResult: answer
        });
    }

    sendAnswer() {
        this.setState({
            answerMade: true
        });

        this.props.sendAnswer(this.props.answer, this);
    }

    getButtonStyle() {
        if (this.state.answerMade && this.state.answerResult === false) {
            return styles.answerButtonWrong;
        } else if (this.state.answerMade && this.state.answerResult === true) {
            return styles.answerButtonCorrect;
        }

        return this.props.disabled
            ? styles.answerButtonDisabled
            : styles.answerButton;
    }

    render() {
        return (
            <div className={styles.answerButton}>
                <Button
                    className={this.getButtonStyle()}
                    text={this.props.answer.toString()}
                    onClick={::this.sendAnswer}
                    disabled={this.isButtonDisabled(this.props.disabled)}
                />
            </div>
        );
    }
};

AnswerButton.propTypes = {
    answer: React.PropTypes.number,
    sendAnswer: React.PropTypes.func.isRequired,
    disabled: React.PropTypes.bool
};

export default AnswerButton;
