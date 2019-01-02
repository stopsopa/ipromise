
// https://auth0.com/blog/secure-your-react-and-redux-app-with-jwt-authentication/
// https://github.com/auth0-blog/nodejs-jwt-authentication-sample
// https://github.com/auth0-blog/redux-auth

import * as actions from "../index";

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_RESET_FAILURE = 'LOGIN_RESET_FAILURE';
export const LOGIN_SIGNOUT  = 'LOGIN_SIGNOUT';

import configPublic from "public.config";

import {
    diffTool,
} from '../../../components/layout/SessionTime';

import {
    notificationAdd
} from '../../actions';

const node = typeof global !== 'undefined' && Object.prototype.toString.call(global.process) === '[object process]';

import { fetchJson } from 'transport';

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

let sessionExpireTimeoutHandler;

export const loginRequest = (username, password) => (dispatch, getState) => {

    const state = getState();

    if (getLoading(state)) {

        return Promise.resolve('canceled');
    }

    dispatch({
        type: LOGIN_RESET_FAILURE
    });

    dispatch(loaderOn());

    return new Promise(resolve => {
        setTimeout(() => {
            dispatch(loaderOff());
            resolve('done');
        }, 1000);
    });
}

export const loginSuccessWithJWTStringToken = (__JWT_TOKEN__, diff) => (dispatch, getState) => {

    dispatch({
        type: LOGIN_SUCCESS,
        payload: __JWT_TOKEN__
    });

    if (node) {

        return;
    }

    if (diff) {

        diffTool.setBrowserCalculatedExpireTime(diff);
    }
};

export const loginRefreshToken = () => (dispatch, getState) => {

    let url = '/endpoint/jwttokenrefresh';

    try {
        if (typeof configPublic.jwt.remote['jwttoken'+'refresh'] === 'string') {

            if (configPublic.jwt.remote['jwttoken'+'refresh'][0] === '/') {

                url = configPublic.jwt.remote['jwttoken'+'refresh'];
            }
            else {

                throw `configPublic.jwt.remote.jwttoken`+`refresh[0] === '/' is not true`
            }
        }
    }
    catch (e) {}

    fetchJson(url)
        .then(json => {

            if (json.error) {

                return dispatch(notificationAdd(json.error, 'error'))
            }

            dispatch(loginSuccessWithJWTStringToken(json.jwt, json.diffInSec));
        })
    ;
};

export const loginError = message => ({
    type: LOGIN_FAILURE,
    payload: {
        message
    }
});

export const loginSignOut = pathAfterSignOut => (dispatch, getState) => {

    dispatch({
        type: LOGIN_SIGNOUT
    });

    if (typeof pathAfterSignOut === 'string') {

        dispatch(push(pathAfterSignOut));
    }
    else {
        log(`loginSignOut: can't redirect, pathAfterSignOut is not string`)
    }
};

export const requestSessionDiff = () => (dispatch, getState) => {

    let url = '/endpoint/jwttokendiff';

    try {
        if (typeof configPublic.jwt.remote['jwttoken'+'diff'] === 'string') {

            if (configPublic.jwt.remote['jwttoken'+'diff'][0] === '/') {

                url = configPublic.jwt.remote['jwttoken'+'diff'];
            }
            else {

                throw `configPublic.jwt.remote.jwttoken`+`diff[0] === '/' is not true`
            }
        }
    }
    catch (e) {}

    return fetchJson(url)
        .then(json => {

            if (json.error) {

                return dispatch(actions.notificationAdd(json.error, 'error'));
            }

            return json.diffInSec;
        }, () => {
            dispatch(actions.notificationAdd('jwttoken'+'diff: catch error', 'error'));
        })
    ;
};
