import React from 'react';
import styles from './styles/rankingsContent.scss';
import RankingTable from '/client/modules/rankings/components/rankingTable';

const RankingsContent = class extends React.Component {
    render() {
        return (
            <div className={styles.rankingsContent}>
                <div className={styles.tableWrapper}>
                    <RankingTable rows={this.props.userData}/>
                </div>
            </div>
        );
    }
};

RankingsContent.propTypes = {
    userData: React.PropTypes.arrayOf(React.PropTypes.object)
};

export default RankingsContent;
