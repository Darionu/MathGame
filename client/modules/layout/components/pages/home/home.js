import React from 'react';
import { FormattedMessage } from 'react-intl';
import styles from './home.scss';

const HomePage = ({}, context) => {
    return (
          <div className={styles.wrapperContainer}>
              HOME
          </div>
    );
};

HomePage.contextTypes = {
    images: React.PropTypes.object
};

export default HomePage;
