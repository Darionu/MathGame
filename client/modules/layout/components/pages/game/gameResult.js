import React from 'react';
import Header from '/client/modules/core/containers/header';
import LoginModal from '/client/modules/core/containers/loginModal';
import BackButton from '/client/modules/core/containers/backButton';
import styles from '/client/modules/layout/components/pages/game/game.scss';
import Footer from '/client/modules/core/containers/footer';
import GameResultContent from '/client/modules/game/containers/gameResultContent';
import RouteNames from '/lib/constants/routeNames';

const GameResult = () => (
    <div className={styles.pageWrapper}>
        <Header/>
        <LoginModal/>
        <Footer/>
        <BackButton routeName={RouteNames.playBoard}/>
        <div className={styles.wrapperContainer}>
            <GameResultContent/>
        </div>
    </div>
);

export default GameResult;
