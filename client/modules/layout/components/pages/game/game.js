import React from 'react';
import Header from '/client/modules/core/containers/header';
import LoginModal from '/client/modules/core/containers/loginModal';
import styles from '/client/modules/layout/components/pages/game/game.scss';
import GameBoard from '/client/modules/game/containers/gameBoard';

const Game = () => (
    <div className={styles.pageWrapper}>
        <Header/>
        <LoginModal/>
        <div className={styles.wrapperContainer}>
            <GameBoard/>
        </div>
    </div>
);

Game.contextTypes = {
    images: React.PropTypes.object
};

export default Game;
