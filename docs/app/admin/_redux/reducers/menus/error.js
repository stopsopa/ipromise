
import {
    MENUS_FORM_ERROR_REQUEST,
    MENUS_FORM_ERROR_SUCCESS,
    MENUS_FORM_ERROR_FAILURE,
} from '../../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case MENUS_FORM_ERROR_REQUEST:
            return action.payload;
        case MENUS_FORM_ERROR_SUCCESS:
            return action.payload;
        case MENUS_FORM_ERROR_FAILURE:
            return action.payload;
        default:
            return state;
    }
}

export const getMenusFormError = state => state;
