import React from 'react';
import styles from './styles/learnContent.scss';
import { defineMessages, intlShape, injectIntl } from 'react-intl';

const messages = defineMessages({

});

const LearnGameContent = class extends React.Component {
    render() {
        const { formatMessage } = this.props.intl;
        return (
            <div className={styles.learnGameContent}>

            </div>
        );
    }
};

LearnGameContent.propTypes = {
    intl: intlShape.isRequired,
    images: React.PropTypes.object
};

export default injectIntl(LearnGameContent);
