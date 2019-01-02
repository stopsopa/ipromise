
import {
    CONTACTFORM_LIST_REQUEST,
    CONTACTFORM_LIST_SUCCESS,
    CONTACTFORM_LIST_FAILURE,
    CONTACTFORM_LIST_READ,
} from '../../actions/types';

import isArray from 'lodash/isArray';

export default (def => (state = def, action) => {
    switch (action.type) {
        case CONTACTFORM_LIST_REQUEST:
            return def;
        case CONTACTFORM_LIST_READ:

            if (isArray(state)) {

                return state.map(c => {

                    if (c.id === action.payload) {

                        c.read = 1;
                    }

                    return c;
                })
            }

        case CONTACTFORM_LIST_SUCCESS:
            return action.payload;
        // case CONTACTFORM_LIST_FAILURE:
        //     return action.payload;
        // case CONTACTFORM_LIST_REMOVE:
        //     return state.filter(item => (item.id != action.payload));
        default:
            return state;
    }
})(false);

export const getContactForm = state => state;

export const getContactFormById = (state, id) => state.find(item => (item.id == id));

export const getContactFormCountUnred = state => {

    if (isArray(state)) {

        return state.reduce((acc, val) => {

            if (!val.read) {

                acc += 1;
            }

            return acc;
        }, 0);
    }

    return 0;
}
