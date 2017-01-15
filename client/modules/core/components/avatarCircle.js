import React from 'react';
import styles from './styles/avatarCircle.scss';

const AvatarCircle = (props) => (
    <img
        className={styles.avatarCircle}
        src={props.image}
    />
);

AvatarCircle.propTypes = {
    image: React.PropTypes.string.isRequired
};

export default AvatarCircle;
