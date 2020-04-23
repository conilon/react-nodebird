import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import axios from 'axios';
import Helmet from 'react-helmet';

import reducer from '../reducers';
import rootSaga from '../sagas';

import { LOAD_USER_REQUEST } from '../reducers/user';
import { CATEGORY_LIST_REQUEST } from '../reducers/category';
import { TAG_LIST_REQUEST } from '../reducers/tag';

import 'antd/dist/antd.css';

const THMSY = ({ Component, store, pageProps }) => {
    console.log('THMSY');
    
    // useEffect(() => {
        // console.log('THMSY useEffect');

        // const cachedPageHeight = [];
        // const html = document.querySelector('html');

        // Router.events.on('routeChangeStart', () => {
        //     console.log('routeChangeStart');
        //     console.log('window.pageYOffset: ', window.pageYOffset);
        //     cachedPageHeight.push(document.documentElement.offsetHeight);
        // });

        // Router.events.on('routeChangeComplete', () => {
        //     console.log('routeChangeComplete');
        //     html.style.height = 'initial';
        //     console.log('html.style.height: ', html.style.height);
        // });

        // Router.beforePopState(() => {
        //     console.log('beforePopState');
        //     html.style.height = `${cachedPageHeight.pop()}px`;
        //     console.log('html.style.height: ', html.style.height);
        //     return true;
        // });

        // const cachedScroll = [];
        // cachedScroll.push([window.scrollX, window.scrollY]);

        // Router.events.on('routeChangeStart', () => {
        //     console.log('routeChangeStart');
        //     cachedScroll.pop();
        //     cachedScroll.push([window.scrollX, window.scrollY]);
        // });

        // Router.beforePopState(() => {
        //     console.log('beforePopState');
        //     const [x = 0, y = 0] = cachedScroll.pop();

        //     setTimeout(() => {
        //         window.scrollTo(x, y);
        //     }, 1000);

        //     return true;
        // });
    // }, []);

    return (
        <Provider store={store}>
            <Helmet
                title="THMSY"
                htmlAttributes={{ lang: 'ko' }}
                meta={[{
                    charset: 'UTF-8',
                }, {
                    name: 'viewport',
                    content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes,viewport-fit=cover',
                }, {
                    'http-equiv': 'X-UA-Compatible', content: 'IE=edge',
                }, {
                    name: 'description', content: 'THMSY',
                }, {
                    property: 'og:title', content: 'THMSY',
                }, {
                    property: 'og:description', content: 'THMSY',
                }, {
                    property: 'og:type', content: 'website',
                }, {
                    property: 'og:image', content: 'http://localhost:3060/favicon.ico',
                }]}
                link={[{
                    rel: 'shortcut icon', href: '/favicon.ico',
                }]}
            />
            <Component {...pageProps} />
        </Provider>
    );
};

THMSY.propTypes = {
    Component: PropTypes.elementType.isRequired,
    store: PropTypes.object.isRequired,
    pageProps: PropTypes.object.isRequired,
};

THMSY.getInitialProps = async (context) => {
    console.log('THMSY.getInitialProps');
    const { ctx, Component } = context;
    let pageProps = {};
    const state = ctx.store.getState();
    const cookie = ctx.isServer ? ctx.req.headers.cookie : '';
    
    if (ctx.isServer && !cookie) {
        axios.defaults.headers.Cookie = '';
    } else if (ctx.isServer && cookie) {
        axios.defaults.headers.Cookie = cookie;
    }

    // if (!state.user.me) ctx.store.dispatch({ type: LOAD_USER_REQUEST });
    if (!state.category.data.length) ctx.store.dispatch({ type: CATEGORY_LIST_REQUEST });
    if (!state.tag.data.length) ctx.store.dispatch({ type: TAG_LIST_REQUEST });

    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx) || {};
    }

    return { pageProps };
};

const configureStore = (initialState, options) => {
    console.log('configureStore');
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware];
    /*
    // 리덕스 사가 액션 로깅하기
    const middlewares = [sagaMiddleware, (store) => (next) => (action) => {
        console.log(action);
        next(action);
    }];
    */
    const enhancer = process.env.NODE_ENV === 'production'
        ? compose(applyMiddleware(...middlewares))
        : compose(
            applyMiddleware(...middlewares), 
            !options.isServer && window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
        );
    const store = createStore(reducer, initialState, enhancer);
    store.sagaTask = sagaMiddleware.run(rootSaga);
    return store;
};

export default withRedux(configureStore)(withReduxSaga(THMSY));
