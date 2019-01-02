
import {
    HASHES_LIST_REQUEST,
    HASHES_LIST_SUCCESS,
    HASHES_LIST_FAILURE,
    HASHES_LIST_REMOVE,
} from '../../actions/types';

export default (def => (state = def, action) => {
    switch (action.type) {
        case HASHES_LIST_REQUEST:
            return def;
        case HASHES_LIST_SUCCESS:
            return action.payload;
        // case HASHES_LIST_FAILURE:
        //     return action.payload;
        case HASHES_LIST_REMOVE:
            return state.filter(item => (item.id != action.payload));
        default:
            return state;
    }
})(false);

export const getHashes = state => state;

export const getHashById = (state, id) => state.find(item => (item.id == id));
