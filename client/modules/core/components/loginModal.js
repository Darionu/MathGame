import React from 'react';
import styles from './styles/loginModal.scss';
import { defineMessages, intlShape, injectIntl } from 'react-intl';
import Button from '/client/modules/core/components/button';
import Input from '/client/modules/core/components/input';

const messages = defineMessages({
    logIn: {
        id: 'app.loginModal.logIn',
        defaultMessage: 'LOG IN'
    },
    signUp: {
        id: 'app.loginModal.signUp',
        defaultMessage: 'SIGN UP'
    },
    username: {
        id: 'app.loginModal.username',
        defaultMessage: 'Username'
    },
    password: {
        id: 'app.loginModal.password',
        defaultMessage: 'Password'
    }
});

const LoginModal = class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoginForm: true
        };

        this.switchFormType = this.switchFormType.bind(this);
        this.getCurrentActionMessage = this.getCurrentActionMessage.bind(this);
    }

    loginAttempt() {

    }

    switchFormType() {
        this.setState({ isLoginForm: !this.state.isLoginForm });
    }

    getCurrentActionMessage(reverted) {
        const { formatMessage } = this.props.intl;
        const isLoginForm = reverted ? !this.state.isLoginForm : this.state.isLoginForm;
        return isLoginForm ? formatMessage(messages.logIn) : formatMessage(messages.signUp);
    }

    getLoginForm() {
        const { formatMessage } = this.props.intl;
        return (
            <div className={styles.loginForm}>
                <form>
                    <Input label={`${formatMessage(messages.username)} :`}/>
                    <Input label={`${formatMessage(messages.password)} :`} type="password"/>
                </form>
                <img className={styles.image} src="/images/squirrel.jpeg" />
            </div>
        )
    }

    getRegisterForm() {
        const { formatMessage } = this.props.intl;
        return (
            <div className={styles.registerForm}>
                <form>
                    <Input label={`${formatMessage(messages.username)} :`}/>
                    <Input label={`${formatMessage(messages.password)} :`} type="password"/>
                </form>
                <img className={styles.image} src="/images/squirrel.jpeg" />
            </div>
        )
    }

    render() {
        return (
            <div className={`${styles.loginModal} ${this.props.isLoginModalVisible ? null : styles.loginModalHidden}`}>
                <div className={styles.wrapper}>
                    <div className={styles.header}>
                        <Button className={styles.closeModal} text="X" onClick={this.props.switchLoginBoxState}/>
                        <span className={styles.headerTitle}>{this.getCurrentActionMessage()}</span>
                    </div>
                    <div className={styles.contentWrapper}>
                        <div className={styles.content}>
                            {this.state.isLoginForm ? this.getLoginForm() : this.getRegisterForm()}
                        </div>
                    </div>
                    <div className={styles.footer}>
                        <div className={styles.footerButtonWrapper}>
                            <Button className={styles.footerButton} text={this.getCurrentActionMessage(true)} onClick={this.switchFormType}/>
                            <Button className={styles.footerButton} text={this.getCurrentActionMessage()} onClick={this.loginAttempt.bind(this)}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

LoginModal.propTypes = {
    intl: intlShape.isRequired,
    isLoginModalVisible: React.PropTypes.bool.isRequired,
    switchLoginBoxState: React.PropTypes.func.isRequired
};

export default injectIntl(LoginModal);
