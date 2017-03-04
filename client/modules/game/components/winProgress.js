import React from 'react';
import styles from './styles/winProgress.scss';
import Slider from 'material-ui/Slider';
import { defineMessages, intlShape, injectIntl } from 'react-intl';
import AvatarCircle from '/client/modules/core/components/avatarCircle';

const messages = defineMessages({
    win: {
        id: 'app.gameBoard.win',
        defaultMessage: 'WIN'
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
                        image={this.props.avatar}
                    />
                    <span className={styles.userName}>
                        {this.props.name}
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
    intl: intlShape.isRequired
};

export default injectIntl(WinProgress);
