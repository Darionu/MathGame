import React from 'react';
import styles from './styles/gameBoard.scss';
import AnswerButton from '/client/modules/game/containers/answerButton';
import Equation from '/client/modules/game/containers/equation';
import { defineMessages, intlShape, injectIntl } from 'react-intl';
import { GamePointsConstants } from '/lib/constants/gameConstants';

const messages = defineMessages({
    equation: {
        id: 'app.game.equation',
        defaultMessage: 'EQUATION'
    },
    answers: {
        id: 'app.game.answers',
        defaultMessage: 'ANSWERS'
    },
    yourPoints: {
        id: 'app.game.yourPoints',
        defaultMessage: 'Your points'
    }
});

const GameBoard = class extends React.Component {
    componentWillMount() {
        this.props.enableAnswerButtons();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.roundNumber && nextProps.roundNumber > this.props.roundNumber) {
            this.props.enableAnswerButtons();
        }
    }

    render() {
        const { formatMessage } = this.props.intl;
        return (
            <div className={styles.gameBoard}>
                <span className={styles.gameBoardFont}>
                     {formatMessage(messages.equation)} (No. {this.props.roundNumber})
                </span>

                <Equation
                    first={this.props.firstNumber}
                    second={this.props.secondNumber}
                    type={this.props.gameType}
                />

                <span className={styles.gameBoardFont}>
                    {formatMessage(messages.answers)}
                </span>

                <div className={styles.singleAnswerLine}>
                    <AnswerButton answer={this.props.answerOne} disabled={this.props.areAnswerButtonsDisabled}/>
                    <AnswerButton answer={this.props.answerTwo} disabled={this.props.areAnswerButtonsDisabled}/>
                </div>

                <div className={styles.singleAnswerLine}>
                    <AnswerButton answer={this.props.answerThree} disabled={this.props.areAnswerButtonsDisabled}/>
                    <AnswerButton answer={this.props.answerFour} disabled={this.props.areAnswerButtonsDisabled}/>
                </div>

                <span className={styles.pointsMessage}>
                    {`${formatMessage(messages.yourPoints)}: ${this.props.userPoints}/${GamePointsConstants.winRequirement}`}
                </span>
            </div>
        );
    }
};

GameBoard.propTypes = {
    intl: intlShape.isRequired,
    firstNumber: React.PropTypes.number,
    secondNumber: React.PropTypes.number,
    gameType: React.PropTypes.number,
    answerOne: React.PropTypes.number,
    answerTwo: React.PropTypes.number,
    answerThree: React.PropTypes.number,
    answerFour: React.PropTypes.number,
    userPoints: React.PropTypes.number,
    areAnswerButtonsDisabled: React.PropTypes.bool,
    enableAnswerButtons: React.PropTypes.func.isRequired
};

export default injectIntl(GameBoard);
