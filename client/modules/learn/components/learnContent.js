import React from 'react';
import styles from './styles/learnContent.scss';
import CardImage from '/client/modules/core/containers/cardImage';
import { defineMessages, intlShape, injectIntl } from 'react-intl';

const messages = defineMessages({
    gameRelatedTitle: {
        id: 'app.learn.gameRelated.title',
        defaultMessage: 'Game related'
    },
    gameRelatedDescription: {
        id: 'app.learn.gameRelated.description',
        defaultMessage: 'Find out all the information about how the game works in general. It may help you to understand how to play.'
    },
    gameRelatedButton: {
        id: 'app.learn.gameRelated.button',
        defaultMessage: `I'm curious about the game`
    },
    mathRelatedTitle: {
        id: 'app.learn.mathRelated.title',
        defaultMessage: 'Math related'
    },
    mathRelatedDescription: {
        id: 'app.learn.mathRelated.description',
        defaultMessage: 'Contains math tips which will help you to understand the math easier.'
    },
    mathRelatedButton: {
        id: 'app.learn.mathRelated.button',
        defaultMessage: `I'm curious about the math`
    },
});

const LearnContent = class extends React.Component {
    render() {
        const { formatMessage } = this.props.intl;
        return (
            <div className={styles.learnContent}>
                <div className={styles.cardImageHolder}>
                    <div className={styles.cardImage}>
                        <CardImage
                            title={formatMessage(messages.gameRelatedTitle)}
                            description={formatMessage(messages.gameRelatedDescription)}
                            buttonText={formatMessage(messages.gameRelatedButton)}
                            buttonClick={this.props.goToGamePage}
                            image={this.props.images.gameCube}
                        />
                    </div>
                    <div className={styles.cardImage}>
                        <CardImage
                            title={formatMessage(messages.mathRelatedTitle)}
                            description={formatMessage(messages.mathRelatedDescription)}
                            buttonText={formatMessage(messages.mathRelatedButton)}
                            buttonClick={this.props.goToMathPage}
                            image={this.props.images.mathBook}
                        />
                    </div>
                </div>
            </div>
        );
    }
};

LearnContent.propTypes = {
    intl: intlShape.isRequired,
    images: React.PropTypes.object,
    goToGamePage: React.PropTypes.func.isRequired,
    goToMathPage: React.PropTypes.func.isRequired
};

export default injectIntl(LearnContent);
