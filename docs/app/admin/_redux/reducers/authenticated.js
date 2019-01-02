
import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_RESET_FAILURE,
    LOGIN_SIGNOUT,
} from '../actions';

import configPublic from 'public.config';

import { combineReducers } from 'redux';

import node from 'detect-node';

import isObject from 'lodash/isObject';

import jwtExtractPayload from 'roderic/libs/jwtExtractPayload';

import isArray from 'lodash/isArray';

import {
    setJwtToken,
} from 'transport';

const jwtPayload = (state = {}, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:

            // {
            //     type: // aciton type
            //     payload: // jwt token (string two dots inside)
            // }

            // if ( ! node ) {
            //
            //     try {
            //         localStorage.setItem(configPublic.jwt.cookie_name, action.payload)
            //     }
            //     catch(e) {
            //         console.error('Failed to setup localStorage jwt token', e);
            //     }
            // }

            setJwtToken(action.payload);

            return jwtExtractPayload(action.payload);

        case LOGIN_SIGNOUT: // usally emmited only by browser

            setJwtToken();

            if ( ! node ) {
                // try {
                //     localStorage.removeItem(configPublic.jwt.cookie_name)
                // }
                // catch(e) {
                //     console.error('Failed to setup localStorage jwt token', e);
                // }

                log("document.cookie = '" + configPublic.jwt.cookie_name + "=;Path=/;Expires=Thu, 01 Jan 1970 00:00:01 GMT;'");
                document.cookie = configPublic.jwt.cookie_name + '=;Path=/;Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            }

            return {};
        default:
            return state;
    }
};

const authError = (def => {
    return (state = def, action) => {
        switch (action.type) {
            case LOGIN_FAILURE:
                return action.payload.message;
            case LOGIN_RESET_FAILURE:
                return def;
            default:
                return state;
        }
    };
})(null);

export default combineReducers({
    jwtPayload,
    authError,
});

export const getHasRole = (state, role) => {

    if (getAuthenticated(state) && role) {

        const user = getUser(state);

        if (user && isArray(user.roles) && user.roles.indexOf(role) > -1) {

            return true;
        }
    }

    return false;
}

export const getAuthenticated = state => {

    const flag =
        state.jwtPayload &&
        isObject(state.jwtPayload) &&
        Object.keys(state.jwtPayload).length > 0
    ;

    // log('jwt', state.jwtPayload, flag)

    return flag;
};

export const getUser = state => state.jwtPayload;

export const getUsername = state => {

    const user = getUser(state);

    if (user) {

        return user.username;
    }

    return undefined;
}

export const getLoginError = state => state.authError;

