
import { combineReducers } from 'redux';

import list, * as fromList from './list';

import edit, * as fromEdit from './edit';

import error, * as fromError from './error';

export default combineReducers({
    edit,
    list,
    error
});

export const getPages = state =>
    fromList.getPages(state.list)
;

export const getPagesForSelectField = state =>
    fromList.getPagesForSelectField(state.list)
;

export const getPageById = (state, id) =>
    fromList.getPageById(state.list, id)
;

export const getPagesEdit = state =>
    fromEdit.getPagesEdit(state.edit)
;

export const getPagesFormError = state =>
    fromError.getPagesFormError(state.error)
;
