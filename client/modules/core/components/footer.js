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
    constructor(props) {
        super(props);
    }

    setLanguage(event) {
        this.props.setLanguage(event.target.name);
    }

    render() {
        const { formatMessage } = this.props.intl;
        return (
            <div className={styles.footer}>
                <span className={styles.description}>Math Game - {formatMessage(messages.description)}</span>
                <span className={styles.copyright}>Tomasz Przytuła © 2017</span>
                {
                    this.props.isLanguageContainerHidden
                    ? null
                    :  <div className={styles.languageContainer}>
                            <img name="pl" className={styles.languageFlag} src={this.props.images.languages.pl} onClick={::this.setLanguage}/>
                            <img name="en" className={styles.languageFlag} src={this.props.images.languages.en} onClick={::this.setLanguage}/>
                        </div>
                }
            </div>
        );
    }
};

Footer.propTypes = {
    images: React.PropTypes.object.isRequired,
    isLanguageContainerHidden: React.PropTypes.bool.isRequired,
    setLanguage: React.PropTypes.func.isRequired
};

export default injectIntl(Footer);
