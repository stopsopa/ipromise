
import {
    RESOURCES_LIST_REQUEST,
    RESOURCES_LIST_SUCCESS,
    RESOURCES_LIST_FAILURE,
    RESOURCES_LIST_REMOVE,
} from '../../actions/types';

const def = false;

export default (def => (state = def, action) => {
    switch (action.type) {
        case RESOURCES_LIST_REQUEST:
            return def;
        case RESOURCES_LIST_SUCCESS:
            return action.payload;
        // case RESOURCES_LIST_FAILURE:
        //     return action.payload;
        case RESOURCES_LIST_REMOVE:
            return state.filter(item => (item.id != action.payload));
        default:
            return state;
    }
})(def);

export const getResources = state => state;

export const getResourcesForSelectField = state => {

    if (state === def) {

        return [];
    }

    return state.map(k => ({
        key     : k.id,
        text    : '[' + k.id + '] ' + k.filename,
        value   : k.id
    }));
};

export const getResourceById = (state, id) => state.find(item => (item.id == id));
