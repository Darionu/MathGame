import React from 'react';
import Header from '/client/modules/core/containers/header';
import LoginModal from '/client/modules/core/containers/loginModal';
import PlayBoardContent from '/client/modules/layout/containers/pages/playBoardContent';
import styles from '/client/modules/layout/components/pages/playBoard/playBoard.scss';
import Footer from '/client/modules/core/containers/footer';
import BackButton from '/client/modules/core/containers/backButton';

const PlayBoard = () => (
    <div className={styles.pageWrapper}>
        <Header/>
        <LoginModal/>
        <Footer/>
        <BackButton/>
        <PlayBoardContent/>
    </div>
);

PlayBoard.contextTypes = {
    images: React.PropTypes.object
};

export default PlayBoard;
