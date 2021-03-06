import React from 'react';
import styles from './styles/button.scss';

const getButtonStyle = (className, overrideDefault = false) => {
    let style = '';

    if (!overrideDefault) {
        style = styles.defaultButton;
    }

    return className ? `${style} ${className}` : style;
};

const isButtonDisabled = (disabled) => !!disabled;

const Button = (props) => (
    <button
        id={props.id}
        className={getButtonStyle(props.className, props.overrideDefault)}
        onClick={props.onClick}
        type={props.type}
        disabled={isButtonDisabled(props.disabled)}
    >
        {props.text}
    </button>
);

Button.propTypes = {
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    overrideDefault: React.PropTypes.bool,
    type: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    text: React.PropTypes.string.isRequired
};

export default Button;
