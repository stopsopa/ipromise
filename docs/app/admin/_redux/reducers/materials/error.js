
import {
    MATERIALS_FORM_ERROR_REQUEST,
    MATERIALS_FORM_ERROR_SUCCESS,
    MATERIALS_FORM_ERROR_FAILURE,
} from '../../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case MATERIALS_FORM_ERROR_REQUEST:
            return action.payload;
        case MATERIALS_FORM_ERROR_SUCCESS:
            return action.payload;
        case MATERIALS_FORM_ERROR_FAILURE:
            return action.payload;
        default:
            return state;
    }
}

export const getMaterialsFormError = state => state;
