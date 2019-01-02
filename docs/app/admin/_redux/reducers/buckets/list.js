
import {
    BUCKETS_LIST_REQUEST,
    BUCKETS_LIST_SUCCESS,
    BUCKETS_LIST_FAILURE,
    BUCKETS_LIST_REMOVE,
} from '../../actions/types';

const def = false;

export default (def => (state = def, action) => {
    switch (action.type) {
        case BUCKETS_LIST_REQUEST:
            return def;
        case BUCKETS_LIST_SUCCESS:
            return action.payload;
        // case BUCKETS_LIST_FAILURE:
        //     return action.payload;
        case BUCKETS_LIST_REMOVE:
            return state.filter(item => (item.id != action.payload));
        default:
            return state;
    }
})(def);

export const getBuckets = state => state;

export const getBucketsForSelectField = state => {

    if (state === def) {

        return [];
    }

    return state.map(k => ({
        key     : k.id,
        text    : k.name,
        value   : k.id
    }));
};

export const getBucketsForSelectFieldEnabled = state => {

    if (state === def) {

        return [];
    }

    return state.filter(k => k.enabled).map(k => ({
        key     : k.id,
        text    : k.name,
        value   : k.id
    }));
};


export const getBucketById = (state, id) => state.find(item => (item.id == id));
