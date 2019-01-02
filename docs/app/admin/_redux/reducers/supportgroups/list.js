
import {
    SUPPORTGROUPS_LIST_REQUEST,
    SUPPORTGROUPS_LIST_SUCCESS,
    SUPPORTGROUPS_LIST_FAILURE,
    SUPPORTGROUPS_LIST_REMOVE,
} from '../../actions/types';

export default (def => (state = def, action) => {
    switch (action.type) {
        case SUPPORTGROUPS_LIST_REQUEST:
            return def;
        case SUPPORTGROUPS_LIST_SUCCESS:
            return action.payload;
        // case SUPPORTGROUPS_LIST_FAILURE:
        //     return action.payload;
        case SUPPORTGROUPS_LIST_REMOVE:
            return state.filter(item => (item.id != action.payload));
        default:
            return state;
    }
})(false);

export const getSupportGroups = state => state;

export const getSupportGroupById = (state, id) => state.find(item => (item.id == id));
