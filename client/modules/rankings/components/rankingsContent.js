import React from 'react';
import styles from './styles/rankingsContent.scss';
import { defineMessages, intlShape, injectIntl } from 'react-intl';

const messages = defineMessages({

});

const RankingsContent = class extends React.Component {
    render() {
        const { formatMessage } = this.props.intl;
        return (
            <div className={styles.rankingsContent}>
                CONTENT
            </div>
        );
    }
};

RankingsContent.propTypes = {
    intl: intlShape.isRequired
};

export default injectIntl(RankingsContent);
