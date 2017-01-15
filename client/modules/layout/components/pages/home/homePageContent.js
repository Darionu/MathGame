import React from 'react';
import { defineMessages, intlShape, injectIntl } from 'react-intl';
import styles from './homePageContent.scss';

import CardImage from '/client/modules/core/containers/cardImage';

const messages = defineMessages({
    rankingsTitle: {
        id: 'app.home.cardImage.rankings.title',
        defaultMessage: 'Rankings'
    },
    rankingsDescription: {
        id: 'app.home.cardImage.rankings.description',
        defaultMessage: 'Check where are you currently sitting in our rankings.'
    },
    rankingsButton: {
        id: 'app.home.cardImage.rankings.button',
        defaultMessage: 'I want to check rankings'
    },
    playTitle: {
        id: 'app.home.cardImage.play.title',
        defaultMessage: 'Play'
    },
    playDescription: {
        id: 'app.home.cardImage.play.description',
        defaultMessage: 'We are waiting for you! Begin your journey by starting a test game with bot opponent..'
    },
    playButton: {
        id: 'app.home.cardImage.play.button',
        defaultMessage: 'I want to playboard'
    },
    learnTitle: {
        id: 'app.home.cardImage.learn.title',
        defaultMessage: 'Learn'
    },
    learnDescription: {
        id: 'app.home.cardImage.learn.description',
        defaultMessage: 'Easy to get game knowledge. Be better than others and learn all the secrets that awaits for you!'
    },
    learnButton: {
        id: 'app.home.cardImage.learn.button',
        defaultMessage: 'I want to learn'
    }
});

const HomePageContent = class extends React.Component {
    render() {
        const { formatMessage } = this.props.intl;
        return (
            <div className={styles.wrapperContainer}>
                <div className={styles.cardImageHolder}>
                    <div className={styles.cardImage}>
                        <CardImage
                            title={formatMessage(messages.rankingsTitle)}
                            description={formatMessage(messages.rankingsDescription)}
                            buttonText={formatMessage(messages.rankingsButton)}
                            buttonClick={this.props.goToRankings}
                            image={this.props.images.dogs}
                        />
                    </div>
                    <div className={styles.cardImage}>
                        <CardImage
                            title={formatMessage(messages.playTitle)}
                            description={formatMessage(messages.playDescription)}
                            buttonText={formatMessage(messages.playButton)}
                            buttonClick={this.props.goToPlayBoard}
                            image={this.props.images.parrot}
                        />
                    </div>
                    <div className={styles.cardImage}>
                        <CardImage
                            title={formatMessage(messages.learnTitle)}
                            description={formatMessage(messages.learnDescription)}
                            buttonText={formatMessage(messages.learnButton)}
                            buttonClick={this.props.goToLearn}
                            image={this.props.images.owl}
                        />
                    </div>
                </div>
            </div>
        );
    }
};

HomePageContent.propTypes = {
    intl: intlShape.isRequired,
    images: React.PropTypes.object,
    goToRankings: React.PropTypes.func.isRequired,
    goToPlayBoard: React.PropTypes.func.isRequired,
    goToLearn: React.PropTypes.func.isRequired
};

export default injectIntl(HomePageContent);
