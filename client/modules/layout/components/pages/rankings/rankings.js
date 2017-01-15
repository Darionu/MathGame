import React from 'react';
import Header from '/client/modules/core/containers/header';

const Rankings = () => (
    <div>
        <Header/>
        Rankings
    </div>
);

Rankings.contextTypes = {
    images: React.PropTypes.object
};

export default Rankings;
