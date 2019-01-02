
import { combineReducers } from 'redux';

import list, * as fromList from './list';

// import edit, * as fromEdit from './edit';

import error, * as fromError from './error';

export default combineReducers({
    // edit,
    list,
    error
});

export const getActivityWall = state =>
    fromList.getActivityWall(state.list)
;

// export const getActivityWallById = (state, id) =>
//     fromList.getActivityWallById(state.list, id)
// ;

// export const getHashesEdit = state =>
//     fromEdit.getHashesEdit(state.edit)
// ;

export const getActivityWallFormError = state =>
    fromError.getActivityWallFormError(state.error)
;
