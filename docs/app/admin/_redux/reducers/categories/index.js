
import { combineReducers } from 'redux';

import list, * as fromList from './list';

import edit, * as fromEdit from './edit';

import error, * as fromError from './error';

export default combineReducers({
    edit,
    list,
    error
});

export const getCategories = state =>
    fromList.getCategories(state.list)
;

export const getCategoriesForSelectField = state =>
    fromList.getCategoriesForSelectField(state.list)
;

export const getCategoryById = (state, id) =>
    fromList.getCategoryById(state.list, id)
;

export const getCategoriesEdit = state =>
    fromEdit.getCategoriesEdit(state.edit)
;

export const getCategoriesFormError = state =>
    fromError.getCategoriesFormError(state.error)
;
