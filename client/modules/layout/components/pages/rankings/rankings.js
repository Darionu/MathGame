import React from 'react';
import Header from '/client/modules/core/containers/header';
import LoginModal from '/client/modules/core/containers/loginModal';
import RankingsContent from '/client/modules/rankings/containers/rankingsContent';
import Footer from '/client/modules/core/containers/footer';
import styles from '/client/modules/layout/components/pages/rankings/rankings.scss';
import BackButton from '/client/modules/core/containers/backButton';

const Rankings = () => (
    <div className={styles.pageWrapper}>
        <Header/>
        <LoginModal/>
        <Footer/>
        <BackButton/>
        <div className={styles.wrapperContainer}>
            <RankingsContent/>
        </div>
    </div>
);

Rankings.contextTypes = {
    images: React.PropTypes.object
};

export default Rankings;
