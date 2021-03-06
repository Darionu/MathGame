import React from 'react';
import LanguageProvider from '../containers/languageProvider';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const Layout = ({ content = () => null }) => (
    <MuiThemeProvider>
        <LanguageProvider>
            <div>
                <Alert position={ 'top-right' } effect={ 'jelly' } timeout={ 3000 } stack={{ limit: 1 }} />
                { content() }
            </div>
        </LanguageProvider>
    </MuiThemeProvider>
);

Layout.propTypes = {
    content: React.PropTypes.func.isRequired
};

export default Layout;
