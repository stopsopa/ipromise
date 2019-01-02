
import {
    TYPES_LIST_REQUEST,
    TYPES_LIST_SUCCESS,
    TYPES_LIST_ADD,
} from '../../actions/types';

const def = false;

export default (def => (state = def, action) => {
    switch (action.type) {
        case TYPES_LIST_REQUEST:
            return def;
        case TYPES_LIST_ADD:
            return [
                ...state,
                {
                    name: action.payload
                }
            ];
        case TYPES_LIST_SUCCESS:
            return action.payload;
        default:
            return state;
    }
})(def);

export const getMaterialTypesForSelectField = state => {

    if (state === def) {

        return [];
    }

    return state.map(k => ({
        key     : k.name,
        text    : k.name,
        value   : k.name
    }));
};
