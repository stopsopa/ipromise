
import {
    BUCKET_FILTERS_LIST_REQUEST,
    BUCKET_FILTERS_LIST_SUCCESS,
    BUCKET_FILTERS_LIST_ADD,
} from '../../actions/types';

const def = false;

export default (def => (state = def, action) => {
    switch (action.type) {
        case BUCKET_FILTERS_LIST_REQUEST:
            return def;
        case BUCKET_FILTERS_LIST_ADD:
            return [
                ...state,
                {
                    name: action.payload
                }
            ];
        case BUCKET_FILTERS_LIST_SUCCESS:
            return action.payload;
        default:
            return state;
    }
})(def);

export const getBucketFiltersForSelectField = state => {

    if (state === def) {

        return [];
    }

    return state.map(k => ({
        key     : k.name,
        text    : k.name,
        value   : k.name
    }));
};
