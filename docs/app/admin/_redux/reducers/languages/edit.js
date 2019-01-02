
import {
    LANGUAGES_EDIT_REQUEST,
    LANGUAGES_EDIT_SUCCESS,
    LANGUAGES_EDIT_FAILURE,
    LANGUAGES_EDIT_SAVE,
    LANGUAGES_EDIT_FIELD
} from '../../actions/types';

import { edit } from 'roderic/libs/access';

export default ((def) => (state = def, action) => {
    switch (action.type) {
        case LANGUAGES_EDIT_FIELD:

            let { key, value, operationType } = action.payload;

            let ns = { ...state };

            edit(ns, key, value, operationType);

            return ns;
        case LANGUAGES_EDIT_REQUEST:
            return def;
        case LANGUAGES_EDIT_SUCCESS:
            return action.payload;
        // case LANGUAGES_EDIT_FAILURE:
        //     return action.payload;
        // case LANGUAGES_EDIT_SAVE:
        //     return action.payload;
        default:
            return state;
    }
})(false);

export const getLanguagesEdit = state => state;
