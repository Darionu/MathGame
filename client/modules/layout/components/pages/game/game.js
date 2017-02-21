import React from 'react';
import Header from '/client/modules/core/containers/header';
import LoginModal from '/client/modules/core/containers/loginModal';

const Game = () => (
    <div>
        <Header/>
        <LoginModal/>
        Game
    </div>
);

Game.contextTypes = {
    images: React.PropTypes.object
};

export default Game;
