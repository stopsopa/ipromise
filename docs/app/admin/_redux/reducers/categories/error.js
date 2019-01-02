
import {
    CATEGORIES_FORM_ERROR_REQUEST,
    CATEGORIES_FORM_ERROR_SUCCESS,
    CATEGORIES_FORM_ERROR_FAILURE,
} from '../../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case CATEGORIES_FORM_ERROR_REQUEST:
            return action.payload;
        case CATEGORIES_FORM_ERROR_SUCCESS:
            return action.payload;
        case CATEGORIES_FORM_ERROR_FAILURE:
            return action.payload;
        default:
            return state;
    }
}

export const getCategoriesFormError = state => state;
