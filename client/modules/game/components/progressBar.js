import React from 'react';
import styles from './styles/progressBar.scss';
import LinearProgress from 'material-ui/LinearProgress';
import { defineMessages, intlShape, injectIntl } from 'react-intl';


const messages = defineMessages({

});

const ProgressBar = class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            barValue: 100,
        };
    }

    componentDidMount() {
        this.timer = setInterval(() => this.progress(1), 200);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.roundNumber && nextProps.roundNumber > this.props.roundNumber) {
            clearInterval(this.timer);
            this.setState({
                barValue: 100
            });
            this.timer = setInterval(() => this.progress(1), 200);
        }
    }

    progress(difference) {
        const newValue = this.state.barValue - difference;
        if (newValue < 0) {
            this.setState({ completed: 0 });
        } else {
            this.setState({ barValue: newValue });
        }
    }

    render() {
        const { formatMessage } = this.props.intl;
        return (
            <div className={styles.progressBar}>
                <LinearProgress mode="determinate" value={this.state.barValue} />
            </div>
        );
    }
};

ProgressBar.propTypes = {
    intl: intlShape.isRequired
};

export default injectIntl(ProgressBar);
