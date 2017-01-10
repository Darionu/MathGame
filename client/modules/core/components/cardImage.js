import React from 'react';
import styles from './styles/cardImage.scss';
import Button from '/client/modules/core/components/button';

const CardImage = class extends React.Component {
    render() {
        return (
            <div className={styles.cardImage}>
                <div className={styles.top}>
                    <img className={styles.image} src={this.props.image} />
                </div>
                <div className={styles.middle}>
                    <div className={styles.title}>{this.props.title}</div>
                    <div className={styles.description}>{this.props.description}</div>
                </div>
                <div className={styles.bottom}>
                    <Button text={this.props.buttonText ? this.props.buttonText : "GO"} overrideDefault className={styles.button}/>
                </div>
            </div>
        );
    }
};

CardImage.propTypes = {
    title: React.PropTypes.string,
    image: React.PropTypes.string,
    buttonText: React.PropTypes.string
};

export default CardImage;
