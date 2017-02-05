import React from 'react';
import styles from './styles/gameTypeItem.scss';

const GameTypeItem = class extends React.Component {
    render() {
        return (
            <div className={styles.gameTypeItem}>
                <img className={styles.icon} src={this.props.icon}/>
                <div className={styles.container}>
                    <div className={styles.title}>{this.props.title}</div>
                </div>
            </div>
        );
    }
};

GameTypeItem.propTypes = {

};

export default GameTypeItem;
