
import {
    REGIONS_EDIT_REQUEST,
    REGIONS_EDIT_SUCCESS,
    REGIONS_EDIT_FAILURE,
    REGIONS_EDIT_SAVE,
    REGIONS_EDIT_FIELD
} from '../../actions/types';

export default ((def) => (state = def, action) => {
    switch (action.type) {
        case REGIONS_EDIT_FIELD:
            return { ...state, [action.payload.key]: action.payload.value }
        case REGIONS_EDIT_REQUEST:
            return def;
        case REGIONS_EDIT_SUCCESS:
            return action.payload;
        // case REGIONS_EDIT_FAILURE:
        //     return action.payload;
        // case REGIONS_EDIT_SAVE:
        //     return action.payload;
        default:
            return state;
    }
})(false);

export const getRegionsEdit = state => state;
