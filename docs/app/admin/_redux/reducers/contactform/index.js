
import { combineReducers } from 'redux';

import list, * as fromList from './list';

import edit, * as fromEdit from './edit';

import error, * as fromError from './error';

export default combineReducers({
    edit,
    list,
    error
});

export const getContactForm = state =>
    fromList.getContactForm(state.list)
;

export const getContactFormCountUnred = state =>
    fromList.getContactFormCountUnred(state.list)
;

export const getContactFormById = (state, id) =>
    fromList.getContactFormById(state.list, id)
;

export const getContactFormEdit = state =>
    fromEdit.getContactFormEdit(state.edit)
;

export const getContactFormError = state =>
    fromError.getContactFormError(state.error)
;
