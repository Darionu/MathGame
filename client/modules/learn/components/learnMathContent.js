import React from 'react';
import styles from './styles/learnContent.scss';
import { defineMessages, intlShape, injectIntl } from 'react-intl';

const messages = defineMessages({

});

const LearnMathContent = class extends React.Component {
    render() {
        const { formatMessage } = this.props.intl;
        return (
            <div className={styles.learnMathContent}>

            </div>
        );
    }
};

LearnMathContent.propTypes = {
    intl: intlShape.isRequired,
    images: React.PropTypes.object
};

export default injectIntl(LearnMathContent);
