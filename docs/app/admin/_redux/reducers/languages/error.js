
import {
    LANGUAGES_FORM_ERROR_REQUEST,
    LANGUAGES_FORM_ERROR_SUCCESS,
    LANGUAGES_FORM_ERROR_FAILURE,
} from '../../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case LANGUAGES_FORM_ERROR_REQUEST:
            return action.payload;
        case LANGUAGES_FORM_ERROR_SUCCESS:
            return action.payload;
        case LANGUAGES_FORM_ERROR_FAILURE:
            return action.payload;
        default:
            return state;
    }
}

export const getLanguagesFormError = state => state;
