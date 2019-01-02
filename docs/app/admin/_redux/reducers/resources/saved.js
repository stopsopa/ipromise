
import {
    RESOURCES_SAVED_TRUE,
    RESOURCES_SAVED_FALSE
} from '../../actions/types';

export default (state = true, action) => {
    switch (action.type) {
        case RESOURCES_SAVED_TRUE:
            return true;
        case RESOURCES_SAVED_FALSE:
            return false;
        default:
            return state;
    }
};

export const getResourcesSavedFlag = state => state;
