
import { combineReducers } from 'redux';

import list, * as fromList from './list';
//
// import edit, * as fromEdit from './edit';
//
// import error, * as fromError from './error';

export default combineReducers({
    // edit,
    list,
    // error
});

// export const getUsers = state =>
//     fromList.getUsers(state.list)
// ;
//
// export const getUserById = (state, id) =>
//     fromList.getUserById(state.list, id)
// ;
//
// export const getUsersEdit = state =>
//     fromEdit.getUsersEdit(state.edit)
// ;
//
// export const getUsersFormError = state =>
//     fromError.getUsersFormError(state.error)
// ;
