
import {
    INDICATIONS_LIST_REQUEST,
    INDICATIONS_LIST_SUCCESS,
    INDICATIONS_LIST_FAILURE,
    INDICATIONS_LIST_REMOVE,
} from '../../actions/types';

const def = false;

export default (def => (state = def, action) => {
    switch (action.type) {
        case INDICATIONS_LIST_REQUEST:
            return def;
        case INDICATIONS_LIST_SUCCESS:
            return action.payload;
        // case INDICATIONS_LIST_FAILURE:
        //     return action.payload;
        case INDICATIONS_LIST_REMOVE:
            return state.filter(item => (item.id != action.payload));
        default:
            return state;
    }
})(def);

export const getIndications = state => state;

export const getIndicationsForSelectField = state => {

    if (state === def) {

        return [];
    }

    return state.map(k => ({
        key     : k.id,
        text    : k.name,
        value   : k.id
    }));
};

export const getIndicationById = (state, id) => state.find(item => (item.id == id));
