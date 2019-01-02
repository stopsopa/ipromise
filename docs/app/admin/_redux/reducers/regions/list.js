
import {
    REGIONS_LIST_REQUEST,
    REGIONS_LIST_SUCCESS,
    REGIONS_LIST_FAILURE,
    REGIONS_LIST_REMOVE,
} from '../../actions/types';

const def = false;

export default (def => (state = def, action) => {
    switch (action.type) {
        case REGIONS_LIST_REQUEST:
            return def;
        case REGIONS_LIST_SUCCESS:
            return action.payload;
        // case REGIONS_LIST_FAILURE:
        //     return action.payload;
        case REGIONS_LIST_REMOVE:
            return state.filter(item => (item.id != action.payload));
        default:
            return state;
    }
})(def);

export const getRegions = state => state;

export const getRegionsForSelectField = state => {

    if (state === def) {

        return [];
    }

    return state.map(k => ({
        key     : k.id,
        text    : k.name,
        value   : k.id
    }));
};

export const getRegionById = (state, id) => state.find(item => (item.id == id));
