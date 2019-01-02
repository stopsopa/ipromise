
import {
    CATEGORIES_LIST_REQUEST,
    CATEGORIES_LIST_SUCCESS,
    CATEGORIES_LIST_FAILURE,
    CATEGORIES_LIST_REMOVE,
} from '../../actions/types';

const def = false;

export default (def => (state = def, action) => {
    switch (action.type) {
        case CATEGORIES_LIST_REQUEST:
            return def;
        case CATEGORIES_LIST_SUCCESS:
            return action.payload;
        // case CATEGORIES_LIST_FAILURE:
        //     return action.payload;
        case CATEGORIES_LIST_REMOVE:
            return state.filter(item => (item.id != action.payload));
        default:
            return state;
    }
})(def);

export const getCategories = state => state;

export const getCategoriesForSelectField = state => {

    if (state === def) {

        return [];
    }

    return state.map(k => ({
        key     : k.id,
        text    : k.name,
        value   : k.id
    }));
};


export const getCategoryById = (state, id) => state.find(item => (item.id == id));
