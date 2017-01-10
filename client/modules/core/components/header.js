import React from 'react';
import styles from './styles/header.scss';
import { defineMessages, intlShape, injectIntl } from 'react-intl';
import Button from '/client/modules/core/components/button';

const messages = defineMessages({
    login: {
        id: 'app.homePage.login',
        defaultMessage: 'Login'
    },
    home: {
        id: 'app.homePage.home',
        defaultMessage: 'Home Page'
    },
    description: {
        id: 'app.homePage.description',
        defaultMessage: 'Your source of fun'
    }
});

const Header = class extends React.Component {
    render() {
        const { formatMessage } = this.props.intl;
        return (
            <div className={styles.header}>
                <div className={styles.container}>
                    <div className={styles.descriptionBar}>
                        <span className={styles.description}>Math Game - {formatMessage(messages.description)}</span>
                    </div>
                    <div className={styles.navigationBar}>
                        <Button className={styles.navigationButton} text={formatMessage(messages.login)}/>
                        <Button className={styles.navigationButton} text={formatMessage(messages.home)}/>
                    </div>
                </div>
            </div>
        );
    }
};

Header.propTypes = {
    intl: intlShape.isRequired
};

export default injectIntl(Header);
