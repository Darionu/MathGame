import React from 'react';
import styles from './styles/avatarCircle.scss';

const AvatarCircle = (props) => (
    <img
        className={`${styles.avatarCircle} ${props.className}`}
        src={props.image}
    />
);

AvatarCircle.propTypes = {
    image: React.PropTypes.string.isRequired,
    className: React.PropTypes.string
};

export default AvatarCircle;
