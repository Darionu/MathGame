import React from 'react';
import { defineMessages, intlShape, injectIntl } from 'react-intl';
import styles from './styles/paperImage.scss';

const messages = defineMessages({

});

const PaperImage = class extends React.Component {
    render() {
        const { formatMessage } = this.props.intl;
        return (
            <div className={styles.paperImage}>
                <div className={styles.top}>
                    <img className={styles.image} src='images/parrot.jpg' />
                </div>
                <div className={styles.middle}>

                </div>
                <div className={styles.bottom}>

                </div>
            </div>
        );
    }
};

PaperImage.propTypes = {
    intl: intlShape.isRequired,
    title: React.PropTypes.string,
    image: React.PropTypes.string
};

export default injectIntl(PaperImage);
