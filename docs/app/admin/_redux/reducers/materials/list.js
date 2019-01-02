
import {
    MATERIALS_LIST_REQUEST,
    MATERIALS_LIST_SUCCESS,
    MATERIALS_LIST_FAILURE,
    MATERIALS_LIST_REMOVE,
    MATERIALS_LIST_REORDER,
} from '../../actions/types';

import { arrayMove } from 'react-sortable-hoc';

export default (def => (state = def, action) => {
    switch (action.type) {
        case MATERIALS_LIST_REQUEST:
            return def;
        case MATERIALS_LIST_REORDER:

            if (typeof action.payload.oldIndex !== 'number') {

                throw `oldIndex in payload of action: '${MATERIALS_LIST_REORDER}' is not number`;
            }

            if (typeof action.payload.newIndex !== 'number') {

                throw `newIndex in payload of action: '${MATERIALS_LIST_REORDER}' is not number`;
            }

            return arrayMove(state, action.payload.oldIndex, action.payload.newIndex)

        case MATERIALS_LIST_SUCCESS:
            return action.payload;
        // case MATERIALS_LIST_FAILURE:
        //     return action.payload;
        case MATERIALS_LIST_REMOVE:
            return state.filter(item => (item.id != action.payload));
        default:
            return state;
    }
})(false);

export const getMaterials = state => state;

export const getMaterialById = (state, id) => state.find(item => (item.id == id));

export const getMaterialsIdsInOrder = state => state.map(item => item.id);

