import React from 'react';
import styles from './styles/gameBoard.scss';
import AnswerButton from '/client/modules/game/containers/answerButton';
import Equation from '/client/modules/game/containers/equation';
import { defineMessages, intlShape, injectIntl } from 'react-intl';
import { GamePointsConstants } from '/lib/constants/gameConstants';
import WinProgress from '/client/modules/game/containers/winProgress';

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
                <WinProgress
                    className={styles.winProgressLeft}
                    name={this.props.opponentData.username}
                    value={this.props.opponentData.points / 50}
                    points={this.props.opponentData.points}
                    avatar={this.props.opponentData.avatar}
                />

                <WinProgress
                    className={styles.winProgressRight}
                    name={this.props.playerData.username}
                    value={this.props.playerData.points / 50}
                    points={this.props.playerData.points}
                    avatar={this.props.playerData.avatar}
                />

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
                    {`${formatMessage(messages.yourPoints)}: ${this.props.playerData.points}/${GamePointsConstants.winRequirement}`}
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
    areAnswerButtonsDisabled: React.PropTypes.bool,
    enableAnswerButtons: React.PropTypes.func.isRequired,
    playerData: React.PropTypes.object.isRequired,
    opponentData: React.PropTypes.object.isRequired
};

export default injectIntl(GameBoard);
