
import {
    RESOURCES_FORM_ERROR_REQUEST,
    RESOURCES_FORM_ERROR_SUCCESS,
    RESOURCES_FORM_ERROR_FAILURE,
} from '../../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case RESOURCES_FORM_ERROR_REQUEST:
            return action.payload;
        case RESOURCES_FORM_ERROR_SUCCESS:
            return action.payload;
        case RESOURCES_FORM_ERROR_FAILURE:
            return action.payload;
        default:
            return state;
    }
}

export const getResourcesFormError = state => state;
