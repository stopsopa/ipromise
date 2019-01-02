
import {
    INDICATIONS_FORM_ERROR_REQUEST,
    INDICATIONS_FORM_ERROR_SUCCESS,
    INDICATIONS_FORM_ERROR_FAILURE,
} from '../../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case INDICATIONS_FORM_ERROR_REQUEST:
            return action.payload;
        case INDICATIONS_FORM_ERROR_SUCCESS:
            return action.payload;
        case INDICATIONS_FORM_ERROR_FAILURE:
            return action.payload;
        default:
            return state;
    }
}

export const getIndicationsFormError = state => state;
