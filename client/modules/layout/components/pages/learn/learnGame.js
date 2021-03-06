import React from 'react';
import Header from '/client/modules/core/containers/header';
import LoginModal from '/client/modules/core/containers/loginModal';
import BackButton from '/client/modules/core/containers/backButton';
import Footer from '/client/modules/core/containers/footer';
import styles from '/client/modules/layout/components/pages/learn/learn.scss';
import LearnGameContent from '/client/modules/learn/containers/learnGameContent';
import RouteNames from '/lib/constants/routeNames';

const Learn = () => (
    <div className={styles.pageWrapper}>
        <Header/>
        <LoginModal/>
        <Footer/>
        <BackButton routeName={RouteNames.learn}/>
        <div className={styles.wrapperContainer}>
           <LearnGameContent/>
        </div>
    </div>
);

Learn.contextTypes = {
    images: React.PropTypes.object
};

export default Learn;
