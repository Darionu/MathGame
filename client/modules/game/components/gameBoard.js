import React from 'react';
import styles from './styles/gameBoard.scss';
import AnswerButton from '/client/modules/game/containers/answerButton';

const GameBoard = class extends React.Component {
    render() {
        return (
            <div className={styles.gameBoard}>
                ALPHA VERSION! TO END GAME SIMPLY LOG OUT! <br/>
                EQUATION <br/>
                {this.props.firstNumber} {this.props.equation} {this.props.secondNumber} = ?

                <br/>ANSWERS
                <div className={styles.singleAnswerLine}>
                    <AnswerButton answer={this.props.answerOne}/>
                    <AnswerButton answer={this.props.answerTwo}/>
                </div>

                <div className={styles.singleAnswerLine}>
                    <AnswerButton answer={this.props.answerThird}/>
                    <AnswerButton answer={this.props.answerFour}/>
                </div>
            </div>
        );
    }
};

GameBoard.propTypes = {

};

export default GameBoard;
