import React from 'react';
import styles from './styles/footer.scss';

const Footer = class extends React.Component {
    render() {
        return (
            <div className={styles.footer}>
                <span className={styles.copyright}>Tomasz Przytuła © 2017</span>
            </div>
        );
    }
};

Footer.propTypes = {

};

export default Footer;
