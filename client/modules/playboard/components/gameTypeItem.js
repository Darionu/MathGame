import React from 'react';
import styles from './styles/gameTypeItem.scss';

const GameTypeItem = class extends React.Component {
    joinQueue() {
        this.props.joinQueue(this.props.gameType);
    }

    render() {
        return (
            <div className={styles.gameTypeItem} onClick={::this.joinQueue}>
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
