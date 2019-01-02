
import {
    PAGES_LIST_REQUEST,
    PAGES_LIST_SUCCESS,
    PAGES_LIST_FAILURE,
    PAGES_LIST_REMOVE,
} from '../../actions/types';

import isArray from 'lodash/isArray';

const def = false;

export default (def => (state = def, action) => {
    switch (action.type) {
        case PAGES_LIST_REQUEST:
            return def;
        case PAGES_LIST_SUCCESS:
            return action.payload;
        // case PAGES_LIST_FAILURE:
        //     return action.payload;
        case PAGES_LIST_REMOVE:
            return state.filter(item => (item.id != action.payload));
        default:
            return state;
    }
})(def);

export const getPages = state => state;

export const getPagesForSelectField = state => {

    if (state === def) {

        return [];
    }

    return state.map(k => ({
        key     : k.id,
        text    : k.name,
        value   : k.id
    }));
};

export const getPageById = (state, id) => {

    if (isArray(state)) {

        return state.find(item => (item.id == id));
    }
};
