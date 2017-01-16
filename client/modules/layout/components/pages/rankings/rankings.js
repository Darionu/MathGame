import React from 'react';
import Header from '/client/modules/core/containers/header';
import LoginModal from '/client/modules/core/containers/loginModal';

const Rankings = () => (
    <div>
        <Header/>
        <LoginModal/>
        Rankings
    </div>
);

Rankings.contextTypes = {
    images: React.PropTypes.object
};

export default Rankings;
