
import {
    IMAGES_FORM_ERROR_REQUEST,
    IMAGES_FORM_ERROR_SUCCESS,
    IMAGES_FORM_ERROR_FAILURE,
} from '../../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case IMAGES_FORM_ERROR_REQUEST:
            return action.payload;
        case IMAGES_FORM_ERROR_SUCCESS:
            return action.payload;
        case IMAGES_FORM_ERROR_FAILURE:
            return action.payload;
        default:
            return state;
    }
}

export const getImagesFormError = state => state;
