import React from 'react';
import styles from './styles/backButton.scss';
import FontAwesome from 'react-fontawesome';

const BackButton = class extends React.Component {
    constructor(props) {
        super(props);
    }

    goToRoute() {
        this.props.goToSpecificRoute(this.props.routeName);
    }

    render() {
        return (
            <div className={styles.backButton} onClick={::this.goToRoute}>
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
    routeName: React.PropTypes.string,
    goToSpecificRoute: React.PropTypes.func.isRequired
};

export default BackButton;
