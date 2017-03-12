import React from 'react';
import styles from './styles/winProgress.scss';
import Slider from 'material-ui/Slider';
import { defineMessages, intlShape, injectIntl } from 'react-intl';
import AvatarCircle from '/client/modules/core/components/avatarCircle';
import AccountTypes from '/lib/constants/accountTypes';

const messages = defineMessages({
    win: {
        id: 'app.gameBoard.win',
        defaultMessage: 'WIN'
    },
    you: {
        id: 'app.core.userName',
        defaultMessage: 'You'
    }
});

const WinProgress = class extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { formatMessage } = this.props.intl;
        return (
            <div className={this.props.className}>
                <div className={styles.top}>
                    {formatMessage(messages.win)}
                </div>
                <Slider
                    style={{ height: '100%' }}
                    sliderStyle={{ margin: '0 auto' }}
                    axis="y"
                    value={this.props.value}
                    onChange={this.onChange}
                    disabled={true}
                />
                <div className={styles.bottom}>
                    <AvatarCircle
                        className={styles.avatar}
                        image={this.props.images.avatars[this.props.player.userData.avatar]}
                    />
                    <span className={styles.userName}>
                        {this.props.player.userData.accountType === AccountTypes.player
                            ? this.props.player.username
                            : formatMessage(messages.you)
                        }
                    </span>
                    <span className={styles.points}>
                        {this.props.points}
                    </span>
                </div>
            </div>
        );
    }
};

WinProgress.propTypes = {
    intl: intlShape.isRequired,
    images: React.PropTypes.object.isRequired,
    playerId: React.PropTypes.string.isRequired,
    player: React.PropTypes.object.isRequired
};

export default injectIntl(WinProgress);
