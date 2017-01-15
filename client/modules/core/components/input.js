import React from 'react';
import styles from './styles/input.scss';

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
                <input
                    className={styles.input}
                    type={this.props.type ? this.props.type : 'text'}
                    name={this.props.name}
                    onChange={this.props.onChangeValue}
                />
            </div>
        );
    }
};

Input.propTypes = {
    type: React.PropTypes.string,
    label: React.PropTypes.string,
    name: React.PropTypes.string,
    onChangeValue: React.PropTypes.func
};

export default Input;
