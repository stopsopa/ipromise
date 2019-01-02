
import {
    BUCKETS_FORM_ERROR_REQUEST,
    BUCKETS_FORM_ERROR_SUCCESS,
    BUCKETS_FORM_ERROR_FAILURE,
} from '../../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case BUCKETS_FORM_ERROR_REQUEST:
            return action.payload;
        case BUCKETS_FORM_ERROR_SUCCESS:
            return action.payload;
        case BUCKETS_FORM_ERROR_FAILURE:
            return action.payload;
        default:
            return state;
    }
}

export const getBucketsFormError = state => state;
