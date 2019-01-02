
import {
    USERS_FORM_ERROR_REQUEST,
    USERS_FORM_ERROR_SUCCESS,
    USERS_FORM_ERROR_FAILURE,
} from '../../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case USERS_FORM_ERROR_REQUEST:
            return action.payload;
        case USERS_FORM_ERROR_SUCCESS:
            return action.payload;
        case USERS_FORM_ERROR_FAILURE:
            return action.payload;
        default:
            return state;
    }
}

export const getUsersFormError = state => state;
