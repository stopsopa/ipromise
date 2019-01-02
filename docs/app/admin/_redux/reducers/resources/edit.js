
import {
    RESOURCES_EDIT_REQUEST,
    RESOURCES_EDIT_SUCCESS,
    RESOURCES_EDIT_FAILURE,
    RESOURCES_EDIT_SAVE,
    RESOURCES_EDIT_FIELD
} from '../../actions/types';

export default ((def) => (state = def, action) => {
    switch (action.type) {
        case RESOURCES_EDIT_FIELD:
            return { ...state, [action.payload.key]: action.payload.value }
        case RESOURCES_EDIT_REQUEST:
            return def;
        case RESOURCES_EDIT_SUCCESS:
            return action.payload;
        // case RESOURCES_EDIT_FAILURE:
        //     return action.payload;
        // case RESOURCES_EDIT_SAVE:
        //     return action.payload;
        default:
            return state;
    }
})(false);

export const getResourcesEdit = state => state;
