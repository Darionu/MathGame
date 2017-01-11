import React from 'react';
import styles from './home.scss';
import Header from '/client/modules/core/containers/header';
import Footer from '/client/modules/core/containers/footer';
import CardImage from '/client/modules/core/containers/cardImage';
import LoginModal from '/client/modules/core/containers/loginModal';

const HomePage = () => (
    <div>
        <Header/>

        <div className={styles.wrapperContainer}>
            <div className={styles.cardImageHolder}>
                <div className={styles.cardImage}>
                    <CardImage title="Rankings" buttonText="I want to check rankings" description="Check where are you currently sitting in our rankings." image="/images/dogs.jpg"/>
                </div>
                <div className={styles.cardImage}>
                    <CardImage title="Play" buttonText="I want to play" description="We are waiting for you! Begin your journey by starting a test game with bot opponent.." image="/images/parrot.jpg"/>
                </div>
                <div className={styles.cardImage}>
                    <CardImage title="Learn" buttonText="I want to learn" description="Easy to get game knowledge. Be better than others and learn all the secrets that awaits for you!" image="/images/owl.jpg"/>
                </div>
            </div>
        </div>

        <Footer/>

        <LoginModal/>
    </div>
);

HomePage.contextTypes = {
    images: React.PropTypes.object
};

export default HomePage;
