
import {
    IMAGES_LIST_REQUEST,
    IMAGES_LIST_SUCCESS,
    IMAGES_LIST_FAILURE,
    IMAGES_LIST_REMOVE,
} from '../../actions/types';

const def = false;

export default (def => (state = def, action) => {
    switch (action.type) {
        case IMAGES_LIST_REQUEST:
            return def;
        case IMAGES_LIST_SUCCESS:
            return action.payload;
        // case IMAGES_LIST_FAILURE:
        //     return action.payload;
        case IMAGES_LIST_REMOVE:
            return state.filter(item => (item.id != action.payload));
        default:
            return state;
    }
})(def);

export const getImages = state => state;

export const getImagesForSelectField = state => {

    if (state === def) {

        return [];
    }

    return state.map(k => ({
        key     : k.id,
        text    : '[' + k.id + '] ' + k.filename,
        value   : k.id
    }));
};

export const getImageById = (state, id) => {

    if (state) {

        return state.find(item => (item.id == id))
    }
};
