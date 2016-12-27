import React from 'react';

const ComponentWrapper = ({ Component, props }) => (
    <Component {...props} />
);

ComponentWrapper.propTypes = {
    Component: React.PropTypes.func.isRequired,
    props: React.PropTypes.object
};

export default ComponentWrapper;
