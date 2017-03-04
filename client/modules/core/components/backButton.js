import React from 'react';
import styles from './styles/backButton.scss';
import FontAwesome from 'react-fontawesome';

const BackButton = class extends React.Component {
    render() {
        return (
            <div className={styles.backButton} onClick={this.props.goToHomePage}>
                <FontAwesome
                    className={styles.backButtonIcon}
                    name='arrow-circle-left'
                    size='5x'
                />
            </div>
        );
    }
};

BackButton.propTypes = {
    goToHomePage: React.PropTypes.func.isRequired
};

export default BackButton;
