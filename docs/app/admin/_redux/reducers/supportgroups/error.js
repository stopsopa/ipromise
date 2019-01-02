
import {
    SUPPORTGROUPS_FORM_ERROR_REQUEST,
    SUPPORTGROUPS_FORM_ERROR_SUCCESS,
    SUPPORTGROUPS_FORM_ERROR_FAILURE,
} from '../../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case SUPPORTGROUPS_FORM_ERROR_REQUEST:
            return action.payload;
        case SUPPORTGROUPS_FORM_ERROR_SUCCESS:
            return action.payload;
        case SUPPORTGROUPS_FORM_ERROR_FAILURE:
            return action.payload;
        default:
            return state;
    }
}

export const getSupportGroupsFormError = state => state;
