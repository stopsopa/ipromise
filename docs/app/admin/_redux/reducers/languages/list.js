
import {
    LANGUAGES_LIST_REQUEST,
    LANGUAGES_LIST_SUCCESS,
    LANGUAGES_LIST_FAILURE,
    LANGUAGES_LIST_REMOVE,
} from '../../actions/types';

import isArray from 'lodash/isArray';

const def = false;

export default (def => (state = def, action) => {
    switch (action.type) {
        case LANGUAGES_LIST_REQUEST:
            return def;
        case LANGUAGES_LIST_SUCCESS:
            return action.payload;
        // case LANGUAGES_LIST_FAILURE:
        //     return action.payload;
        case LANGUAGES_LIST_REMOVE:
            return state.filter(item => (item.id != action.payload));
        default:
            return state;
    }
})(def);

export const getLanguages = state => {

    if (isArray(state)) {

        let tmp = state.find(l => l.shortname == 'en');

        if (tmp) {

            tmp = [tmp].concat(state.filter(l => l.shortname != 'en'));

            return tmp;
        }
    }

    return state;
};

export const getLanguagesForSelectField = state => {

    if (state === def) {

        return [];
    }

    return state.map(k => ({
        key     : k.id,
        text    : k.name,
        value   : k.id
    }));
};

export const getLanguageById = (state, id) => {

    if (isArray(state)) {

        return state.find(item => (item.id == id));
    }

};
