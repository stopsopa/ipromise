
import {
    MAIN_REQUEST,
    MAIN_SUCCESS,
    MAIN_FAILURE,
    MAIN_SUCCESS_APPEND
} from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case MAIN_REQUEST:

            const copy = {...state};

            delete copy[action.payload];

            return copy;

        case MAIN_SUCCESS:
            return {
                ...state,
                ...{
                    [action.payload.section] : action.payload.content
                }
            };

        case MAIN_SUCCESS_APPEND:

            const tmp = {...state};

            tmp[action.payload.section] = tmp[action.payload.section].concat(action.payload.content);

            return tmp;
        default:
            return state;
    }
}

export const getMain = state => state;

export const getMainSection = (state, section) => {

    if ( ! section ) {

        throw `Parameter 'section' can't be empty`;
    }

    return state[section];
}