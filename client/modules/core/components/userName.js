import React from 'react';
import styles from './styles/userName.scss';

import AvatarCircle from '/client/modules/core/components/avatarCircle';

const UserName = class extends React.Component {
    render() {
        return (
            <div className={styles.userName}>
                <AvatarCircle className={styles.avatar} image={this.props.userAvatar} />
                <span className={styles.userNameLabel}>{this.props.user.username}</span>
            </div>
        );
    }
};

UserName.propTypes = {
    user: React.PropTypes.object.isRequired,
    userAvatar: React.PropTypes.string
};

export default UserName;
