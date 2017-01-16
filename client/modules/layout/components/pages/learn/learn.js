import React from 'react';
import Header from '/client/modules/core/containers/header';
import LoginModal from '/client/modules/core/containers/loginModal';

const Learn = () => (
    <div>
        <Header/>
        <LoginModal/>
        Learn
    </div>
);

Learn.contextTypes = {
    images: React.PropTypes.object
};

export default Learn;
