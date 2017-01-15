import React from 'react';
import styles from './styles/header.scss';
import { defineMessages, intlShape, injectIntl } from 'react-intl';

import Button from '/client/modules/core/components/button';
import UserName from '/client/modules/core/containers/userName';

const messages = defineMessages({
    home: {
        id: 'app.homePage.home',
        defaultMessage: 'Home Page'
    },
    description: {
        id: 'app.homePage.description',
        defaultMessage: 'Your source of fun'
    },
    login: {
        id: 'app.homePage.login',
        defaultMessage: 'Login'
    },
    logout: {
        id: 'app.homePage.logout',
        defaultMessage: 'Logout'
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
                        {this.props.userIsLogged ? <UserName/> : null}
                    </div>
                    <div className={styles.navigationBar}>
                        {this.props.userIsLogged
                            ? <Button
                                className={styles.navigationButton}
                                text={formatMessage(messages.logout)}
                                onClick={this.props.logout}
                              />
                            : <Button
                                className={styles.navigationButton}
                                text={formatMessage(messages.login)}
                                onClick={this.props.switchLoginBoxState}
                              />
                        }
                        <Button
                            className={styles.navigationButton}
                            text={formatMessage(messages.home)}
                            onClick={this.props.goToHomePage}
                        />
                    </div>
                </div>
            </div>
        );
    }
};

Header.propTypes = {
    intl: intlShape.isRequired,
    userIsLogged: React.PropTypes.bool.isRequired,
    switchLoginBoxState: React.PropTypes.func.isRequired,
    goToHomePage: React.PropTypes.func.isRequired,
    logout: React.PropTypes.func.isRequired
};

export default injectIntl(Header);
