import React from 'react';
import styles from './styles/userName.scss';

import AvatarCircle from '/client/modules/core/components/avatarCircle';

const UserName = class extends React.Component {
    getComponentStyle() {
        return this.props.className
            ? this.props.className
            : styles.userName;
    }

    getStatisticTemplate() {
        return (
            <div className={styles.statistics}>
                <span className={styles.wins}>
                    {this.props.statistics.wins}
                </span>
                /
                <span className={styles.loses}>
                    {this.props.statistics.loses}
                </span>
            </div>
        );
    }

    render() {
        return (
            <div className={this.getComponentStyle()}>
                <AvatarCircle image={this.props.userAvatar} />
                <span className={styles.userNameLabel}>{this.props.user.username}</span>
                {this.props.hideScore
                    ? null
                    : this.getStatisticTemplate()
                }
            </div>
        );
    }
};

UserName.propTypes = {
    user: React.PropTypes.object.isRequired,
    userAvatar: React.PropTypes.string
};

export default UserName;
