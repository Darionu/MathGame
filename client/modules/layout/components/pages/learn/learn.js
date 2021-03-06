import React from 'react';
import Header from '/client/modules/core/containers/header';
import LoginModal from '/client/modules/core/containers/loginModal';
import BackButton from '/client/modules/core/containers/backButton';
import Footer from '/client/modules/core/containers/footer';
import styles from '/client/modules/layout/components/pages/learn/learn.scss';
import LearnContent from '/client/modules/learn/containers/learnContent';

const Learn = () => (
    <div className={styles.pageWrapper}>
        <Header/>
        <LoginModal/>
        <Footer/>
        <BackButton/>
        <div className={styles.wrapperContainer}>
            <LearnContent/>
        </div>
    </div>
);

Learn.contextTypes = {
    images: React.PropTypes.object
};

export default Learn;
