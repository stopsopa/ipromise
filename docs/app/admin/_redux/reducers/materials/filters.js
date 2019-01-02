
import {
    MATERIAL_FILTERS_LIST_REQUEST,
    MATERIAL_FILTERS_LIST_SUCCESS,
    MATERIAL_FILTERS_LIST_ADD,
} from '../../actions/types';

const def = false;

export default (def => (state = def, action) => {
    switch (action.type) {
        case MATERIAL_FILTERS_LIST_REQUEST:
            return def;
        case MATERIAL_FILTERS_LIST_ADD:
            return [
                ...state,
                {
                    name: action.payload
                }
            ];
        case MATERIAL_FILTERS_LIST_SUCCESS:
            return action.payload;
        default:
            return state;
    }
})(def);

export const getMaterialsFiltersForSelectField = state => {

    if (state === def) {

        return [];
    }

    return state.map(k => ({
        key     : k.name,
        text    : k.name,
        value   : k.name
    }));
};
