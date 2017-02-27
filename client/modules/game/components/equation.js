import React from 'react';
import styles from './styles/equation.scss';
import { GameTypes } from '/lib/constants/gameConstants';

const Equation = class extends React.Component {
    getGameEquation() {
        const { images, type } = this.props;
        switch(type) {
            case GameTypes.addition:
                return images.mathSigns.plus;
            case GameTypes.subtraction:
                return images.mathSigns.subtract;
            case GameTypes.multiplication:
                return images.mathSigns.multiply;
            case GameTypes.division:
                return images.mathSigns.divide;
            default:
                return '';
        }
    };

    render() {
        return (
            <div className={styles.equation}>
                <span className={styles.mathFont}> {this.props.first} </span>
                <img className={styles.mathSign} src={this.getGameEquation()} />
                <span className={styles.mathFont}> {this.props.second} </span>
                <img className={styles.mathSign} src={this.props.images.mathSigns.equals} />
                <img className={styles.questionMark} src={this.props.images.mathSigns.questionMark} />
            </div>
        );
    }
};

Equation.propTypes = {
    first: React.PropTypes.number,
    second: React.PropTypes.number,
    type: React.PropTypes.number,
    images: React.PropTypes.object.isRequired
};

export default Equation;
