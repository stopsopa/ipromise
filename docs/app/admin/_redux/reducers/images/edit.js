
import {
    IMAGES_EDIT_REQUEST,
    IMAGES_EDIT_SUCCESS,
    IMAGES_EDIT_FAILURE,
    IMAGES_EDIT_SAVE,
    IMAGES_EDIT_FIELD
} from '../../actions/types';

export default ((def) => (state = def, action) => {
    switch (action.type) {
        case IMAGES_EDIT_FIELD:
            return { ...state, [action.payload.key]: action.payload.value }
        case IMAGES_EDIT_REQUEST:
            return def;
        case IMAGES_EDIT_SUCCESS:
            return action.payload;
        // case IMAGES_EDIT_FAILURE:
        //     return action.payload;
        // case IMAGES_EDIT_SAVE:
        //     return action.payload;
        default:
            return state;
    }
})(false);

export const getImagesEdit = state => state;
