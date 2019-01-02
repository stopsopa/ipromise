
import {
    PAGES_FORM_ERROR_REQUEST,
    PAGES_FORM_ERROR_SUCCESS,
    PAGES_FORM_ERROR_FAILURE,
} from '../../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case PAGES_FORM_ERROR_REQUEST:
            return action.payload;
        case PAGES_FORM_ERROR_SUCCESS:
            return action.payload;
        case PAGES_FORM_ERROR_FAILURE:
            return action.payload;
        default:
            return state;
    }
}

export const getPagesFormError = state => state;
