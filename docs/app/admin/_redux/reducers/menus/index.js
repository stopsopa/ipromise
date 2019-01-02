
import { combineReducers } from 'redux';

import list, * as fromList from './list';

import edit, * as fromEdit from './edit';

import error, * as fromError from './error';

export default combineReducers({
    edit,
    list,
    error,
});

export const getMenus = state =>
    fromList.getMenus(state.list)
;

export const getMenuById = (state, id) =>
    fromList.getMenuById(state.list, id)
;

export const getMenusEdit = state =>
    fromEdit.getMenusEdit(state.edit)
;

export const getMenusFormError = state =>
    fromError.getMenusFormError(state.error)
;
