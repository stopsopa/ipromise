
import {
    CATEGORIES_EDIT_REQUEST,
    CATEGORIES_EDIT_SUCCESS,
    CATEGORIES_EDIT_FAILURE,
    CATEGORIES_EDIT_SAVE,
    CATEGORIES_EDIT_FIELD
} from '../../actions/types';

import { edit } from 'roderic/libs/access';

export default ((def) => (state = def, action) => {
    switch (action.type) {
        case CATEGORIES_EDIT_FIELD:

            let { key, value, operationType } = action.payload;

            let ns = { ...state };

            edit(ns, key, value, operationType);

            return ns;
        case CATEGORIES_EDIT_REQUEST:
            return def;
        case CATEGORIES_EDIT_SUCCESS:
            return action.payload;
        // case CATEGORIES_EDIT_FAILURE:
        //     return action.payload;
        // case CATEGORIES_EDIT_SAVE:
        //     return action.payload;
        default:
            return state;
    }
})(false);

export const getCategoriesEdit = state => state;
