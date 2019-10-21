import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Document, { Main, NextScript } from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(context) {
        const page = context.renderPage((App) => (props) => <App {...props} />);
        return { ...page, helmet: Helmet.renderStatic() };
    }

    render() {
        const { htmlAttributes, bodyAttributes, ...helmet } = this.props.helmet;
        const htmlAttrs = htmlAttributes.toComponent();
        const bodyAttrs = bodyAttributes.toComponent();

        return (
            <html {...htmlAttrs} lang="ko">
                <head>
                    {Object.values(helmet).map((el) => el.toComponent())}
                </head>
                <body {...bodyAttrs}>
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}

MyDocument.propTypes = {
    helmet: PropTypes.object.isRequired,
};

export default MyDocument;
