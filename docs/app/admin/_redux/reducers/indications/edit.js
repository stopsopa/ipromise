
import {
    INDICATIONS_EDIT_REQUEST,
    INDICATIONS_EDIT_SUCCESS,
    INDICATIONS_EDIT_FAILURE,
    INDICATIONS_EDIT_SAVE,
    INDICATIONS_EDIT_FIELD
} from '../../actions/types';

export default ((def) => (state = def, action) => {
    switch (action.type) {
        case INDICATIONS_EDIT_FIELD:
            return { ...state, [action.payload.key]: action.payload.value }
        case INDICATIONS_EDIT_REQUEST:
            return def;
        case INDICATIONS_EDIT_SUCCESS:
            return action.payload;
        // case INDICATIONS_EDIT_FAILURE:
        //     return action.payload;
        // case INDICATIONS_EDIT_SAVE:
        //     return action.payload;
        default:
            return state;
    }
})(false);

export const getIndicationsEdit = state => state;
