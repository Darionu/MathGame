import React from 'react';
import Header from '/client/modules/core/containers/header';

const PlayBoard = () => (
    <div>
        <Header/>
        Playboard
    </div>
);

PlayBoard.contextTypes = {
    images: React.PropTypes.object
};

export default PlayBoard;
