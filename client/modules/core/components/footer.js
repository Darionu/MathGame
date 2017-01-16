import React from 'react';
import styles from './styles/footer.scss';
import { defineMessages, injectIntl } from 'react-intl';

const messages = defineMessages({
    description: {
        id: 'app.homePage.description',
        defaultMessage: 'Your source of fun'
    }
});

const Footer = class extends React.Component {
    render() {
        const { formatMessage } = this.props.intl;
        return (
            <div className={styles.footer}>
                <span className={styles.description}>Math Game - {formatMessage(messages.description)}</span>
                <span className={styles.copyright}>Tomasz Przytuła © 2017</span>
            </div>
        );
    }
};

export default injectIntl(Footer);
