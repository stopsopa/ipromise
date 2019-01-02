
import {
    SUBCATEGORIES_LIST_REQUEST,
    SUBCATEGORIES_LIST_SUCCESS,
    SUBCATEGORIES_LIST_FAILURE,
    SUBCATEGORIES_LIST_REMOVE,
} from '../../actions/types';

export default (def => (state = def, action) => {
    switch (action.type) {
        case SUBCATEGORIES_LIST_REQUEST:
            return def;
        case SUBCATEGORIES_LIST_SUCCESS:
            return action.payload;
        // case SUBCATEGORIES_LIST_FAILURE:
        //     return action.payload;
        case SUBCATEGORIES_LIST_REMOVE:
            return state.filter(item => (item.id != action.payload));
        default:
            return state;
    }
})(false);

export const getSubcategories = state => state;

export const getSubcategoryById = (state, id) => state.find(item => (item.id == id));
