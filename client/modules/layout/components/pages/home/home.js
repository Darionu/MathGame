import React from 'react';
import Header from '/client/modules/core/containers/header';
import Footer from '/client/modules/core/containers/footer';
import LoginModal from '/client/modules/core/containers/loginModal';
import HomePageContent from '/client/modules/layout/containers/pages/homePageContent';

const HomePage = () => (
    <div>
        <Header/>
        <HomePageContent/>
        <Footer/>
        <LoginModal/>
    </div>
);

HomePage.contextTypes = {
    images: React.PropTypes.object
};

export default HomePage;
