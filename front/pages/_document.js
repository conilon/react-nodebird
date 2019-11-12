import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

class MyDocument extends Document {
    static getInitialProps(ctx) {
        const sheet = new ServerStyleSheet();
        const page = ctx.renderPage((App) => (props) => sheet.collectStyles(<App {...props} />));
        const styleTags = sheet.getStyleElement();
        return { ...page, helmet: Helmet.renderStatic(), styleTags };
    }

    render() {
        const { htmlAttributes, bodyAttributes, ...helmet } = this.props.helmet;
        const htmlAttrs = htmlAttributes.toComponent();
        const bodyAttrs = bodyAttributes.toComponent();

        return (
            <Html {...htmlAttrs} lang="ko">
                <Head>
                    {this.props.styleTags}
                    {Object.values(helmet).map((el) => el.toComponent())}
                </Head>
                <body {...bodyAttrs}>
                    <Main />
                    {process.env.NODE_ENV === 'production'
                    && <script src="https://polyfill.io/v3/polyfill.min.js?features=es6,es7,es8,es9,NodeList.prototype.forEach&flags=gated" />}
                    <NextScript />
                </body>
            </Html>
        );
    }
}

MyDocument.propTypes = {
    helmet: PropTypes.object.isRequired,
    styleTags: PropTypes.array.isRequired,
};

export default MyDocument;
