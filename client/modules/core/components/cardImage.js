import React from 'react';
import { defineMessages, intlShape, injectIntl } from 'react-intl';
import styles from './styles/cardImage.scss';

import Button from '/client/modules/core/components/button';

const messages = defineMessages({
    buttonText: {
        id: 'app.cardImage.buttonText',
        defaultMessage: 'GO'
    }
});

const CardImage = class extends React.Component {
    render() {
        const { formatMessage } = this.props.intl;
        return (
            <div className={styles.cardImage}>
                <div className={styles.top}>
                    <img className={styles.image} src={this.props.image} />
                </div>
                <div className={styles.middle}>
                    <div className={styles.title}>{this.props.title}</div>
                    <div className={styles.description}>{this.props.description}</div>
                </div>
                <div className={styles.bottom}>
                    <Button
                        text={this.props.buttonText ? this.props.buttonText : formatMessage(messages.buttonText)}
                        overrideDefault
                        className={styles.button}
                        onClick={this.props.buttonClick ? this.props.buttonClick : null}
                    />
                </div>
            </div>
        );
    }
};

CardImage.propTypes = {
    intl: intlShape.isRequired,
    title: React.PropTypes.string,
    image: React.PropTypes.string,
    buttonText: React.PropTypes.string,
    buttonClick: React.PropTypes.func
};

export default injectIntl(CardImage);
