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
    alphaWarning: {
        id: 'app.game.alphaWarning',
        defaultMessage: '* ALPHA VERSION! TO END GAME SIMPLY LOG OUT!'
    },
    yourPoints: {
        id: 'app.game.yourPoints',
        defaultMessage: 'Your points'
    }
});

const GameBoard = class extends React.Component {
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
                    <AnswerButton answer={this.props.answerOne}/>
                    <AnswerButton answer={this.props.answerTwo}/>
                </div>

                <div className={styles.singleAnswerLine}>
                    <AnswerButton answer={this.props.answerThree}/>
                    <AnswerButton answer={this.props.answerFour}/>
                </div>

                <span className={styles.pointsMessage}>
                    {`${formatMessage(messages.yourPoints)}: ${this.props.userPoints}/${GamePointsConstants.winRequirement}`}
                </span>

                <span className={styles.warning}>
                     {formatMessage(messages.alphaWarning)}
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
    userPoints: React.PropTypes.number
};

export default injectIntl(GameBoard);
