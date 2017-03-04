import React from 'react';
import styles from './styles/equation.scss';
import { GameTypes } from '/lib/constants/gameConstants';

const Equation = class extends React.Component {
    getGameEquation() {
        const { images, type } = this.props;
        switch(type) {
            case GameTypes.addition:
                return '+';
            case GameTypes.subtraction:
                return '-';
            case GameTypes.multiplication:
                return '*';
            case GameTypes.division:
                return '/';
            default:
                return '';
        }
    };

    render() {
        return (
            <div className={styles.equation}>
                <span className={styles.mathFont}> {this.props.first} </span>
                <span className={styles.mathFontDark}> {this.getGameEquation()} </span>
                <span className={styles.mathFont}> {this.props.second} </span>
                <span className={styles.mathFontDark}> = </span>
                <span className={styles.mathFont}> ? </span>
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
