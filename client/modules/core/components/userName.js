import React from 'react';
import styles from './styles/userName.scss';
import AccountTypes from '/lib/constants/accountTypes';
import AvatarCircle from '/client/modules/core/components/avatarCircle';
import { defineMessages, intlShape, injectIntl } from 'react-intl';

const messages = defineMessages({
    you: {
        id: 'app.core.userName',
        defaultMessage: 'You'
    }
});

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
        const { formatMessage } = this.props.intl;
        return (
            <div className={this.getComponentStyle()}>
                <AvatarCircle image={this.props.userAvatar} />
                <span className={styles.userNameLabel}>
                    {this.props.user && this.props.user.userData.accountType === AccountTypes.player
                        ? this.props.user.username
                        : formatMessage(messages.you)
                    }
                    </span>
                {this.props.hideScore
                    ? null
                    : this.getStatisticTemplate()
                }
            </div>
        );
    }
};

UserName.propTypes = {
    intl: intlShape.isRequired,
    user: React.PropTypes.object.isRequired,
    userAvatar: React.PropTypes.string
};

export default injectIntl(UserName);
