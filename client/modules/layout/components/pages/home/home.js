import React from 'react';
import styles from './home.scss';

const HomePage = () => (
    <div className={styles.wrapperContainer}>
        HOME
    </div>
);

HomePage.contextTypes = {
    images: React.PropTypes.object
};

export default HomePage;
