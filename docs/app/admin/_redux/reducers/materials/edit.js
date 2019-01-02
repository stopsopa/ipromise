
import {
    MATERIALS_EDIT_REQUEST,
    MATERIALS_EDIT_SUCCESS,
    MATERIALS_EDIT_FAILURE,
    MATERIALS_EDIT_SAVE,
    MATERIALS_EDIT_FIELD,
    IMAGES_LIST_REMOVE,
} from '../../actions/types';

import isArray from 'lodash/isArray';

export default ((def) => (state = def, action) => {
    switch (action.type) {
        case MATERIALS_EDIT_FIELD:
            return { ...state, [action.payload.key]: action.payload.value }
        case MATERIALS_EDIT_REQUEST:
            return def;
        case MATERIALS_EDIT_SUCCESS:
            return action.payload;
        case IMAGES_LIST_REMOVE:
            if (state.thumbnails && isArray(state.thumbnails)) {

                var index = state.thumbnails.indexOf(action.payload);

                if (index > -1) {

                    state.thumbnails.splice(index, 1);

                    return {...state};
                }
            }

        // case MATERIALS_EDIT_FAILURE:
        //     return action.payload;
        // case MATERIALS_EDIT_SAVE:
        //     return action.payload;
        default:
            return state;
    }
})(false);

export const getMaterialsEdit = state => state;
