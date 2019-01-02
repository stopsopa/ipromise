
import {
    SUBCATEGORIES_EDIT_REQUEST,
    SUBCATEGORIES_EDIT_SUCCESS,
    SUBCATEGORIES_EDIT_FAILURE,
    SUBCATEGORIES_EDIT_SAVE,
    SUBCATEGORIES_EDIT_FIELD
} from '../../actions/types';

export default ((def) => (state = def, action) => {
    switch (action.type) {
        case SUBCATEGORIES_EDIT_FIELD:
            return { ...state, [action.payload.key]: action.payload.value }
        case SUBCATEGORIES_EDIT_REQUEST:
            return def;
        case SUBCATEGORIES_EDIT_SUCCESS:
            return action.payload;
        // case SUBCATEGORIES_EDIT_FAILURE:
        //     return action.payload;
        // case SUBCATEGORIES_EDIT_SAVE:
        //     return action.payload;
        default:
            return state;
    }
})(false);

export const getSubcategoriesEdit = state => state;
