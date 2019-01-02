
import {
    SUBCATEGORIES_FORM_ERROR_REQUEST,
    SUBCATEGORIES_FORM_ERROR_SUCCESS,
    SUBCATEGORIES_FORM_ERROR_FAILURE,
} from '../../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case SUBCATEGORIES_FORM_ERROR_REQUEST:
            return action.payload;
        case SUBCATEGORIES_FORM_ERROR_SUCCESS:
            return action.payload;
        case SUBCATEGORIES_FORM_ERROR_FAILURE:
            return action.payload;
        default:
            return state;
    }
}

export const getSubcategoriesError = state => state;
