'use strict';

import "@babel/polyfill";

import React from 'react';

import ReactDOM, { hydrate } from 'react-dom';

import RootWeb from './components/RootWeb';

import configureStore from 'roderic/libs/configureStore';

import webGetCookie from 'roderic/libs/webGetCookie';

import env from 'roderic/webpack/dotenv';

env.webload(require('preprocessor/dotenv.json'), 'web');

import {
    loginError,
    loginSuccessWithJWTStringToken
} from './_redux/actions';

import reducers from './_redux/reducers';

const preloadedState = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

// const predicate = (getState, action) => {
//
//     if (action.type === LOGIN_EXPIRE_NOTIFICATION_TIME_LEFT) {
//
//         return false;
//     }
//
//     return true;
// };

const store = configureStore({
    preloadedState,
    reducers,
    manualDebug: !!(function () {
        try {
            return localStorage.getItem('debug');
        }catch (e) {}
    }()),
    // createLoggerConfig: {
    //     predicate
    // },
    // composeEnhancersConfig: {
    //     predicate
    // }
});

// authentication
(function () {

    let token;

    if (window.__JWT_TOKEN__ !== undefined) {

        token = window.__JWT_TOKEN__;

        delete window.__JWT_TOKEN__;
    }

    if (token === undefined) {

        token = webGetCookie() || undefined;
    }

    if (token) {

        store.dispatch(loginSuccessWithJWTStringToken(token));
        // log('not triggering loginSuccessWithJWTStringToken')
    }

    if (token === false) {
        // to prevent error: React attempted to reuse markup in a container but the checksum was invalid
        setTimeout(() => store.dispatch(loginError("Unrecognized username or password")), 0);
    }
}());

hydrate(
    <RootWeb
        store={store}
        // location={location.href.substring((location.origin||'').length).split('#')[0]}
        location={location.pathname}
    />,
    document.getElementById('app')
);

if (/app_dev\.php/.test(location.href)) {
    document.body.classList.add('dev');
}
