import React from 'react';
import Header from '/client/modules/core/containers/header';
import LoginModal from '/client/modules/core/containers/loginModal';

const PlayBoard = () => (
    <div>
        <Header/>
        <LoginModal/>
        Playboard
    </div>
);

PlayBoard.contextTypes = {
    images: React.PropTypes.object
};

export default PlayBoard;
