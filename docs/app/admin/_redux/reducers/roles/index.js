
import {
    ROLES_LIST_REQUEST,
    ROLES_LIST_SUCCESS,
    ROLES_LIST_FAILURE,
} from '../../actions/types';

export default (def => (state = def, action) => {
    switch (action.type) {
        case ROLES_LIST_REQUEST:
            return def;
        case ROLES_LIST_SUCCESS:
            return action.payload;
        // case ROLES_LIST_FAILURE:
        //     return action.payload;
        default:
            return state;
    }
})(false);

export const getRoles = state => state;

export const getRoleById = (state, id) => state.find(item => (item.id == id));
