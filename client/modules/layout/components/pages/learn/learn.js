import React from 'react';
import Header from '/client/modules/core/containers/header';

const Learn = () => (
    <div>
        <Header/>
        Learn
    </div>
);

Learn.contextTypes = {
    images: React.PropTypes.object
};

export default Learn;
