
import {
    IMAGES_SAVED_TRUE,
    IMAGES_SAVED_FALSE
} from '../../actions/types';

export default (state = true, action) => {
    switch (action.type) {
        case IMAGES_SAVED_TRUE:
            return true;
        case IMAGES_SAVED_FALSE:
            return false;
        default:
            return state;
    }
};

export const getImagesSavedFlag = state => state;
