import React from 'react';
import Helmet from 'react-helmet';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(context) {
        const initialProps = await Document.getInitialProps(context);
        return { ...initialProps, helmet: Helmet.renderStatic() };
    }

    render() {
        const { htmlAttributes, bodyAttributes, ...helmet } = this.props.helmet;
        const htmlAttrs = htmlAttributes.toComponent();
        const bodyAttrs = bodyAttributes.toComponent();

        return (
            <Html {...htmlAttrs} lang="ko">
                <Head>
                    {Object.values(helmet).map((el) => el.toComponent())}
                </Head>
                <body {...bodyAttrs}>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
