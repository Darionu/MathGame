import React from 'react';
import styles from './styles/input.scss';
import Button from '/client/modules/core/components/button';


const Input = class extends React.Component {
    getLabel() {
        return (
            <label className={styles.label}>
                {this.props.label}
            </label>
        )
    }

    render() {
        return (
            <div className={styles.inputWrapper}>
                {this.props.label ? this.getLabel() : null}
                <input className={styles.input} type={this.props.type ? this.props.type : 'text'} name={this.props.label} />
            </div>
        );
    }
};

Input.propTypes = {
    type: React.PropTypes.string,
    label: React.PropTypes.string
};

export default Input;
