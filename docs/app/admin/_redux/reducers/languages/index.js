
import { combineReducers } from 'redux';

import list, * as fromList from './list';

import edit, * as fromEdit from './edit';

import error, * as fromError from './error';

export default combineReducers({
    edit,
    list,
    error
});

export const getLanguages = state =>
    fromList.getLanguages(state.list)
;

export const getLanguagesForSelectField = state =>
    fromList.getLanguagesForSelectField(state.list)
;

export const getLanguageById = (state, id) =>
    fromList.getLanguageById(state.list, id)
;

export const getLanguagesEdit = state =>
    fromEdit.getLanguagesEdit(state.edit)
;

export const getLanguagesFormError = state =>
    fromError.getLanguagesFormError(state.error)
;
