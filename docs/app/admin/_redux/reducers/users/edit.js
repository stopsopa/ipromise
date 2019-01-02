
import {
    USERS_EDIT_REQUEST,
    USERS_EDIT_SUCCESS,
    USERS_EDIT_FAILURE,
    USERS_EDIT_SAVE,
    USERS_EDIT_FIELD
} from '../../actions/types';

import isArray from 'lodash/isArray';

export default ((def) => (state = def, action) => {
    switch (action.type) {
        case USERS_EDIT_FIELD:

            if (action.payload.key === 'roles') {

                let roles = [];

                if (isArray(state.roles)) {

                    roles = state.roles;
                }

                const t = action.payload.value;

                if (t.checked) {

                    if (roles.indexOf(t.id) === -1) {

                        roles.push(t.id);
                    }
                }
                else {

                    if (roles.indexOf(t.id) > -1) {

                        roles = roles.filter(k => k !== t.id);
                    }
                }

                return {...state, ...{roles}}
            }

            return { ...state, [action.payload.key]: action.payload.value }
        case USERS_EDIT_REQUEST:
            return def;
        case USERS_EDIT_SUCCESS:
            return action.payload;
        // case USERS_EDIT_FAILURE:
        //     return action.payload;
        // case USERS_EDIT_SAVE:
        //     return action.payload;
        default:
            return state;
    }
})(false);

export const getUsersEdit = state => state;
