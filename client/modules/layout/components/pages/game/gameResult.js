import React from 'react';
import Header from '/client/modules/core/containers/header';
import LoginModal from '/client/modules/core/containers/loginModal';
import styles from '/client/modules/layout/components/pages/game/game.scss';
import Footer from '/client/modules/core/containers/footer';
import GameResultContent from '/client/modules/game/containers/gameResultContent';

const GameResult = () => (
    <div className={styles.pageWrapper}>
        <Header/>
        <LoginModal/>
        <Footer/>
        <div className={styles.wrapperContainer}>
            <GameResultContent/>
        </div>
    </div>
);

export default GameResult;
