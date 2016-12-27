import React from 'react';
import { Component } from 'react';

class Page extends Component {
    getChildContext() {
        return {
            texts: this.props.texts,
            images: this.props.images
        };
    }

    render() {
        const PageComponent = this.props.pageComponent;
        return (<PageComponent />);
    }
}
Page.childContextTypes = {
    texts: React.PropTypes.object,
    images: React.PropTypes.object
};

Page.propTypes = {
    pageComponent: React.PropTypes.func.isRequired,
    texts: React.PropTypes.object.isRequired,
    images: React.PropTypes.object.isRequired
};

export default Page;
