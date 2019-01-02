
import {
    MENUS_LIST_REQUEST,
    MENUS_LIST_SUCCESS,
    MENUS_LIST_FAILURE,
    MENUS_LIST_REMOVE,
} from '../../actions/types';

const def = false;

export default (def => (state = def, action) => {
    switch (action.type) {
        case MENUS_LIST_REQUEST:
            return def;
        // case MENUS_LIST_SUCCESS:
        //     return action.payload;
        // case MENUS_LIST_FAILURE:
        //     return action.payload;
        case MENUS_LIST_REMOVE:
            return state.filter(item => (item.id != action.payload));
        default:
            return state;
    }
})(def);

export const getMenus = state => state;

export const getMenuById = (state, id) => state.find(item => (item.id == id));
