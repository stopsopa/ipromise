
import {
    REFERENCES_LIST_REQUEST,
    REFERENCES_LIST_SUCCESS,
    REFERENCES_LIST_FAILURE,
} from '../../actions/types';

const def = false;

export default (def => (state = def, action) => {
    switch (action.type) {
        case REFERENCES_LIST_REQUEST:
            return def;
        case REFERENCES_LIST_SUCCESS:
            return action.payload;
        default:
            return state;
    }
})(def);

export const getReferences = state => state;
