
import {
    CONTACTFORM_FORM_ERROR_REQUEST,
    CONTACTFORM_FORM_ERROR_SUCCESS,
    CONTACTFORM_FORM_ERROR_FAILURE,
} from '../../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case CONTACTFORM_FORM_ERROR_REQUEST:
            return action.payload;
        case CONTACTFORM_FORM_ERROR_SUCCESS:
            return action.payload;
        case CONTACTFORM_FORM_ERROR_FAILURE:
            return action.payload;
        default:
            return state;
    }
}

export const getContactFormError = state => state;
