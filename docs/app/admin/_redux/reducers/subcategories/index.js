
import { combineReducers } from 'redux';

import list, * as fromList from './list';

import edit, * as fromEdit from './edit';

import error, * as fromError from './error';

export default combineReducers({
    edit,
    list,
    error
});

export const getSubcategories = state =>
    fromList.getSubcategories(state.list)
;

export const getSubcategoryById = (state, id) =>
    fromList.getSubcategoryById(state.list, id)
;

export const getSubcategoriesEdit = state =>
    fromEdit.getSubcategoriesEdit(state.edit)
;

export const getSubcategoriesError = state =>
    fromError.getSubcategoriesError(state.error)
;
