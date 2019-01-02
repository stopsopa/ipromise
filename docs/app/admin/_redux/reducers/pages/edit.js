
import {
    PAGES_EDIT_REQUEST,
    PAGES_EDIT_SUCCESS,
    PAGES_EDIT_FAILURE,
    PAGES_EDIT_SAVE,
    PAGES_EDIT_FIELD,
} from '../../actions/types';

import { edit } from 'roderic/libs/access';

export default ((def) => (state = def, action) => {
    switch (action.type) {
        case PAGES_EDIT_FIELD:

            let { key, value, operationType } = action.payload;

            let ns = { ...state };

            edit(ns, key, value, operationType);

            return ns;
        case PAGES_EDIT_REQUEST:
            return def;
        case PAGES_EDIT_SUCCESS:
            return action.payload;
        // case PAGES_EDIT_FAILURE:
        //     return action.payload;
        // case PAGES_EDIT_SAVE:
        //     return action.payload;
        default:
            return state;
    }
})(false);

export const getPagesEdit = state => state;
