import React from 'react';
import Header from '/client/modules/core/containers/header';
import LoginModal from '/client/modules/core/containers/loginModal';
import RankingsContent from '/client/modules/rankings/containers/rankingsContent';
import styles from '/client/modules/layout/components/pages/rankings/rankings.scss';

const Rankings = () => (
    <div className={styles.pageWrapper}>
        <Header/>
        <LoginModal/>
        <div className={styles.wrapperContainer}>
            <RankingsContent/>
        </div>
    </div>
);

Rankings.contextTypes = {
    images: React.PropTypes.object
};

export default Rankings;
