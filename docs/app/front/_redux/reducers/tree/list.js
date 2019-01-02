
import {
    USERS_LIST_REQUEST,
    USERS_LIST_SUCCESS,
    USERS_LIST_FAILURE,
    USERS_LIST_REMOVE,
} from '../../actions/types';

export default (def => (state = def, action) => {
    switch (action.type) {
        case USERS_LIST_REQUEST:
            return def;
        case USERS_LIST_SUCCESS:
            return action.payload;
        // case USERS_LIST_FAILURE:
        //     return action.payload;
        case USERS_LIST_REMOVE:
            return state.filter(item => (item.id != action.payload));
        default:
            return state;
    }
})(false);

export const getUsers = state => state;

export const getUserById = (state, id) => state.find(item => (item.id == id));
