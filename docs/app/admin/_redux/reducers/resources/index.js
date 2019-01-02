
import { combineReducers } from 'redux';

import list, * as fromList from './list';

import edit, * as fromEdit from './edit';

import error, * as fromError from './error';

import saved, * as fromSaved from './saved';

export default combineReducers({
    edit,
    saved,
    list,
    error
});

export const getResourcesSavedFlag = state =>
    fromSaved.getResourcesSavedFlag(state.saved)
;

export const getResources = state =>
    fromList.getResources(state.list)
;

export const getResourcesForSelectField = state =>
    fromList.getResourcesForSelectField(state.list)
;

export const getResourceById = (state, id) =>
    fromList.getResourceById(state.list, id)
;

export const getResourcesEdit = state =>
    fromEdit.getResourcesEdit(state.edit)
;

export const getResourcesFormError = state =>
    fromError.getResourcesFormError(state.error)
;
