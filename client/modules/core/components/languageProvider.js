import React from 'react';
import { IntlProvider } from 'react-intl';

const LanguageProvider = ({ locale, messages, children }) => (
    <IntlProvider locale={locale} messages={messages}>
        {children}
    </IntlProvider>
);

LanguageProvider.propTypes = {
    locale: React.PropTypes.string.isRequired,
    messages: React.PropTypes.object.isRequired,
    children: React.PropTypes.element.isRequired
};

export default LanguageProvider;
