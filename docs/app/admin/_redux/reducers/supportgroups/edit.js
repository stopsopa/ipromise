
import {
    SUPPORTGROUPS_EDIT_REQUEST,
    SUPPORTGROUPS_EDIT_SUCCESS,
    SUPPORTGROUPS_EDIT_FAILURE,
    SUPPORTGROUPS_EDIT_SAVE,
    SUPPORTGROUPS_EDIT_FIELD,
    IMAGES_LIST_REMOVE
} from '../../actions/types';

import isArray from 'lodash/isArray';

export default ((def) => (state = def, action) => {
    switch (action.type) {
        case SUPPORTGROUPS_EDIT_FIELD:
            return { ...state, [action.payload.key]: action.payload.value }
        case SUPPORTGROUPS_EDIT_REQUEST:
            return def;
        case SUPPORTGROUPS_EDIT_SUCCESS:
            return action.payload;
        case IMAGES_LIST_REMOVE:
            if (state.images && isArray(state.images)) {

                var index = state.images.indexOf(action.payload);

                if (index > -1) {

                    state.images.splice(index, 1);

                    return {...state};
                }
            }
        // case SUPPORTGROUPS_EDIT_FAILURE:
        //     return action.payload;
        // case SUPPORTGROUPS_EDIT_SAVE:
        //     return action.payload;
        default:
            return state;
    }
})(false);

export const getSupportGroupsEdit = state => state;
