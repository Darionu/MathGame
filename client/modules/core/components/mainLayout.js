import React from 'react';
import LanguageProvider from '../containers/languageProvider';

const Layout = ({ content = () => null }) => (
    <LanguageProvider>
      <div>
        {content()}
      </div>
    </LanguageProvider>
);

Layout.propTypes = {
    content: React.PropTypes.func.isRequired
};

export default Layout;
