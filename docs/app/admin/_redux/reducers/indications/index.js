
import { combineReducers } from 'redux';

import list, * as fromList from './list';

import edit, * as fromEdit from './edit';

import error, * as fromError from './error';

export default combineReducers({
    edit,
    list,
    error
});

export const getIndications = state =>
    fromList.getIndications(state.list)
;

export const getIndicationsForSelectField = state =>
    fromList.getIndicationsForSelectField(state.list)
;

export const getIndicationById = (state, id) =>
    fromList.getIndicationById(state.list, id)
;

export const getIndicationsEdit = state =>
    fromEdit.getIndicationsEdit(state.edit)
;

export const getIndicationsFormError = state =>
    fromError.getIndicationsFormError(state.error)
;
