
import {
    HASHES_FORM_ERROR_REQUEST,
    HASHES_FORM_ERROR_SUCCESS,
    HASHES_FORM_ERROR_FAILURE,
} from '../../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case HASHES_FORM_ERROR_REQUEST:
            return action.payload;
        case HASHES_FORM_ERROR_SUCCESS:
            return action.payload;
        case HASHES_FORM_ERROR_FAILURE:
            return action.payload;
        default:
            return state;
    }
}

export const getHashesFormError = state => state;
