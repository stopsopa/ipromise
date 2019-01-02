
import {
    REGIONS_FORM_ERROR_REQUEST,
    REGIONS_FORM_ERROR_SUCCESS,
    REGIONS_FORM_ERROR_FAILURE,
} from '../../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case REGIONS_FORM_ERROR_REQUEST:
            return action.payload;
        case REGIONS_FORM_ERROR_SUCCESS:
            return action.payload;
        case REGIONS_FORM_ERROR_FAILURE:
            return action.payload;
        default:
            return state;
    }
}

export const getRegionsFormError = state => state;
