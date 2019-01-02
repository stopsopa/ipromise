
import {
    HASHES_EDIT_REQUEST,
    HASHES_EDIT_SUCCESS,
    HASHES_EDIT_FAILURE,
    HASHES_EDIT_SAVE,
    HASHES_EDIT_FIELD
} from '../../actions/types';

export default ((def) => (state = def, action) => {
    switch (action.type) {
        case HASHES_EDIT_FIELD:
            return { ...state, [action.payload.key]: action.payload.value }
        case HASHES_EDIT_REQUEST:
            return def;
        case HASHES_EDIT_SUCCESS:
            return action.payload;
        // case HASHES_EDIT_FAILURE:
        //     return action.payload;
        // case HASHES_EDIT_SAVE:
        //     return action.payload;
        default:
            return state;
    }
})(false);

export const getHashesEdit = state => state;
