
import {
    CONTACTFORM_EDIT_REQUEST,
    CONTACTFORM_EDIT_SUCCESS,
    CONTACTFORM_EDIT_FAILURE,
    CONTACTFORM_EDIT_SAVE,
    CONTACTFORM_EDIT_FIELD,
    IMAGES_LIST_REMOVE
} from '../../actions/types';

import isArray from 'lodash/isArray';

export default ((def) => (state = def, action) => {
    switch (action.type) {
        case CONTACTFORM_EDIT_FIELD:
            return { ...state, [action.payload.key]: action.payload.value }
        case CONTACTFORM_EDIT_REQUEST:
            return def;
        case CONTACTFORM_EDIT_SUCCESS:
            return action.payload;
        case IMAGES_LIST_REMOVE:
            if (state.images && isArray(state.images)) {

                var index = state.images.indexOf(action.payload);

                if (index > -1) {

                    state.images.splice(index, 1);

                    return {...state};
                }
            }
        // case CONTACTFORM_EDIT_FAILURE:
        //     return action.payload;
        // case CONTACTFORM_EDIT_SAVE:
        //     return action.payload;
        default:
            return state;
    }
})(false);

export const getContactFormEdit = state => state;
