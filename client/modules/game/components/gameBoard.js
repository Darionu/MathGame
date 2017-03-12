import React from 'react';
import styles from './styles/gameBoard.scss';
import AnswerButton from '/client/modules/game/containers/answerButton';
import Equation from '/client/modules/game/containers/equation';
import { defineMessages, intlShape, injectIntl } from 'react-intl';
import { GamePointsConstants } from '/lib/constants/gameConstants';
import WinProgress from '/client/modules/game/containers/winProgress';
import ProgressBar from '/client/modules/game/containers/progressBar';

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
    constructor(props) {
        super(props);

        this.state = {
            differenceRound: 0,
            pointDifference: -1
        };
    }

    componentWillMount() {
        this.props.enableAnswerButtons();
        this.setState({
            differenceRound: 0,
            pointDifference: -1
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.playerData && nextProps.playerData.points !== this.props.playerData.points) {
            this.setState({
                differenceRound: nextProps.roundNumber + 1,
                pointDifference: nextProps.playerData.points - this.props.playerData.points
            });
        }

        if (nextProps.roundNumber && nextProps.roundNumber > this.props.roundNumber) {
            this.props.enableAnswerButtons();

            if (this.state.differenceRound < nextProps.roundNumber) {
                this.setState({
                    differenceRound: nextProps.roundNumber + 1,
                    pointDifference: 0
                });
            }
        }
    }

    render() {
        const { formatMessage } = this.props.intl;
        return (
            <div className={styles.gameBoard}>
                <WinProgress
                    className={styles.winProgressLeft}
                    playerId={this.props.opponentData._id}
                    value={this.props.opponentData.points / 100}
                    points={this.props.opponentData.points}
                />

                <WinProgress
                    className={styles.winProgressRight}
                    playerId={this.props.playerData._id}
                    value={this.props.playerData.points / 100}
                    points={this.props.playerData.points}
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

                <ProgressBar roundNumber={this.props.roundNumber}/>

                <span className={styles.pointsMessage}>
                    {`${formatMessage(messages.yourPoints)}: ${this.props.playerData.points}/${GamePointsConstants.winRequirement}`}
                </span>

                {this.state.pointDifference > -1
                    ?
                        <span className={styles.pointDifference}>
                            + {this.state.pointDifference}
                        </span>
                    : null
                }
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
