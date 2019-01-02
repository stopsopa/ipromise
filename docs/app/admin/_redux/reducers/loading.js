
import { combineReducers } from 'redux';

import {
    LOADER_ON,
    LOADER_OFF,
    LOADER_ERROR,
    LOADER_MESSAGE,
    LOADER_BUTTONS_SHOW,
    LOADER_BUTTONS_HIDE
} from '../actions/types';

const status = (state = 'off', action) => {
    switch (action.type) {
        case LOADER_ON:
            return 'on';
        case LOADER_ERROR:
            return 'err';
        case LOADER_OFF:
            return 'off';
        case LOADER_MESSAGE:
            return 'msg';
        default:
            return state;
    }
}

const msg = (state = '', action) => {
    switch (action.type) {
        case LOADER_ERROR:
        case LOADER_MESSAGE:
            return action.msg;
        default:
            return state;
    }
}

const show = (state = false, action) => {
    switch (action.type) {
        case LOADER_BUTTONS_SHOW:
            return true;
        case LOADER_BUTTONS_HIDE:
            return false;
        default:
            return state;
    }
}

export default combineReducers({
    status,
    msg,
    show
});

// selectors
export const getLoaderStatus    = state => state.status;

export const getLoaderMsg       = state => state.msg;

export const getLoading         = state => getLoaderStatus(state) === 'on';

export const getLoaderButtonVisible = state => state.show;

