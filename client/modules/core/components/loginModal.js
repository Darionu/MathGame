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
    },
    loginSuccess: {
        id: 'app.loginModal.loginSuccess',
        defaultMessage: 'Logged in successfully!'
    },
    loginFail: {
        id: 'app.loginModal.loginFail',
        defaultMessage: 'Failed to log in'
    },
    registerSuccess: {
        id: 'app.loginModal.registerSuccess',
        defaultMessage: 'Account registered successfully!'
    },
    registerFail: {
        id: 'app.loginModal.registerFail',
        defaultMessage: 'Register failed'
    },
    yourAvatar: {
        id: 'app.loginModal.yourAvatar',
        defaultMessage: 'Your profile avatar'
    },
    clickToChange: {
        id: 'app.loginModal.clickToChange',
        defaultMessage: 'Click on avatar to change'
    },
    leave: {
        id: 'app.loginModal.leave',
        defaultMessage: 'LEAVE'
    },
    selectAvatar: {
        id: 'app.loginModal.selectAvatar',
        defaultMessage: 'Select avatar'
    },
    language: {
        id: 'app.loginModal.language',
        defaultMessage: 'Language'
    },
    english: {
        id: 'app.loginModal.english',
        defaultMessage: 'English'
    },
    polish: {
        id: 'app.loginModal.polish',
        defaultMessage: 'Polish'
    }
});

const LoginModal = class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoginForm: true,
            isSelectingAvatar: false,
            username: '',
            password: '',
            language: 'en',
            chosenAvatar: 'otter'
        };

        this.switchFormType = ::this.switchFormType;
        this.getCurrentActionMessage = ::this.getCurrentActionMessage;
        this.handleChangeValue = ::this.handleChangeValue;
        this.selectAvatar = ::this.selectAvatar;
        this.openAvatarSelection = ::this.openAvatarSelection;
        this.leaveAvatarSelection = ::this.leaveAvatarSelection;
        this.closeLoginModal = ::this.closeLoginModal;
    }

    submit() {
        const { formatMessage } = this.props.intl;
        const alertMessages = {
            loginSuccess: formatMessage(messages.loginSuccess),
            loginFail: formatMessage(messages.loginFail),
            registerSuccess: formatMessage(messages.registerSuccess),
            registerFail: formatMessage(messages.registerFail)
        };

        if (this.state.isLoginForm) {
            this.props.loginAttempt(this.state.username, this.state.password, alertMessages);
        } else {
            this.props.registerAttempt(this.state.username, this.state.password, this.state.language, this.state.chosenAvatar, alertMessages);
        }
    }

    handleChangeValue (event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    switchFormType() {
        this.setState({
            isSelectingAvatar: false,
            isLoginForm: !this.state.isLoginForm
        });
    }

    getCurrentActionMessage(reverted) {
        const { formatMessage } = this.props.intl;
        const isLoginForm = reverted ? !this.state.isLoginForm : this.state.isLoginForm;
        return isLoginForm ? formatMessage(messages.logIn) : formatMessage(messages.signUp);
    }

    openAvatarSelection() {
        this.setState({ isSelectingAvatar: true });
    }

    selectAvatar(event) {
        this.setState({
            isSelectingAvatar: false,
            chosenAvatar: event.target.name
        });
    }

    getLoginForm() {
        const { formatMessage } = this.props.intl;
        return (
            <div className={styles.loginForm}>
                <form>
                    <Input label={`${formatMessage(messages.username)} :`} name="username" onChangeValue={this.handleChangeValue}/>
                    <Input label={`${formatMessage(messages.password)} :`} name="password" type="password" onChangeValue={this.handleChangeValue}/>
                </form>
                <img className={styles.image} src={this.props.images.squirrel} />
            </div>
        )
    }

    getRegisterForm() {
        const { formatMessage } = this.props.intl;
        if (this.state.isSelectingAvatar) {
            return (
                <div className={styles.registerForm}>
                    <div className={styles.chooseAvatarLabel}>{ formatMessage(messages.selectAvatar) }</div>
                    <div className={styles.avatarsWrapper}>
                        <img className={styles.avatarToChoose} src={this.props.images.avatars.bird} name="bird" selected="true" onClick={this.selectAvatar}/>
                        <img className={styles.avatarToChoose} src={this.props.images.avatars.bird2} name="bird2" selected="true" onClick={this.selectAvatar}/>
                        <img className={styles.avatarToChoose} src={this.props.images.avatars.eagle} name="eagle" selected="true" onClick={this.selectAvatar}/>
                        <img className={styles.avatarToChoose} src={this.props.images.avatars.giraffe} name="giraffe" selected="true" onClick={this.selectAvatar}/>
                        <img className={styles.avatarToChoose} src={this.props.images.avatars.otter} name="otter" selected="true" onClick={this.selectAvatar}/>
                        <img className={styles.avatarToChoose} src={this.props.images.avatars.tiger} name="tiger" selected="true" onClick={this.selectAvatar}/>
                    </div>
                </div>
            )
        } else {
            return (
                <div className={styles.registerForm}>
                    <form>
                        <Input label={`${formatMessage(messages.username)} :`} name="username" onChangeValue={this.handleChangeValue}/>
                        <Input label={`${formatMessage(messages.password)} :`} name="password" type="password" onChangeValue={this.handleChangeValue}/>
                        <span className={styles.label}>{formatMessage(messages.language)}: </span>
                        <select name="language" onChange={this.handleChangeValue}>
                            <option value="en">{formatMessage(messages.english)}</option>
                            <option value="pl">{formatMessage(messages.polish)}</option>
                        </select>
                    </form>
                    <div className={styles.label}>{ formatMessage(messages.yourAvatar) }</div>
                    <img className={styles.selectedAvatar} src={this.props.images.avatars[this.state.chosenAvatar]} selected="true" onClick={this.openAvatarSelection}/>
                    <div className={styles.clickToChangeLabel}>* { formatMessage(messages.clickToChange) }</div>
                </div>
            )
        }
    }

    leaveAvatarSelection() {
        this.setState({ isSelectingAvatar: false });
    }

    closeLoginModal() {
        this.setState({
            isSelectingAvatar: false,
            isLoginForm: true
        }, () => {
            this.props.switchLoginBoxState();
        });
    }

    render() {
        const { formatMessage } = this.props.intl;
        return (
            <div className={`${styles.loginModal} ${this.props.isLoginModalVisible ? null : styles.loginModalHidden}`}>
                <div className={styles.wrapper}>
                    <div className={styles.header}>
                        <Button className={styles.closeModal} text="X" onClick={this.closeLoginModal}/>
                        <span className={styles.headerTitle}>{this.getCurrentActionMessage()}</span>
                    </div>
                    <div className={styles.contentWrapper}>
                        <div className={styles.content}>
                            {this.state.isLoginForm ? this.getLoginForm() : this.getRegisterForm()}
                        </div>
                    </div>
                    <div className={styles.footer}>
                        <div className={styles.footerButtonWrapper}>
                            {this.state.isSelectingAvatar
                                ? <Button className={styles.footerButton} text={formatMessage(messages.leave)} onClick={this.leaveAvatarSelection}/>
                                :
                                <div>
                                    <Button className={styles.footerButton} text={this.getCurrentActionMessage(true)} onClick={this.switchFormType}/>
                                    <Button className={styles.footerButton} text={this.getCurrentActionMessage()} onClick={::this.submit}/>
                                </div>
                            }
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
    switchLoginBoxState: React.PropTypes.func.isRequired,
    loginAttempt: React.PropTypes.func.isRequired,
    registerAttempt: React.PropTypes.func.isRequired
};

export default injectIntl(LoginModal);
