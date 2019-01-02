
import {
    ACTIVITYWALL_FORM_ERROR_REQUEST,
    ACTIVITYWALL_FORM_ERROR_SUCCESS,
    ACTIVITYWALL_FORM_ERROR_FAILURE,
} from '../../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case ACTIVITYWALL_FORM_ERROR_REQUEST:
            return action.payload;
        case ACTIVITYWALL_FORM_ERROR_SUCCESS:
            return action.payload;
        case ACTIVITYWALL_FORM_ERROR_FAILURE:
            return action.payload;
        default:
            return state;
    }
}

export const getActivityWallFormError = state => state;
