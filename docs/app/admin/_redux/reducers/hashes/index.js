
import { combineReducers } from 'redux';

import list, * as fromList from './list';

import edit, * as fromEdit from './edit';

import error, * as fromError from './error';

export default combineReducers({
    edit,
    list,
    error
});

export const getHashes = state =>
    fromList.getHashes(state.list)
;

export const getHashById = (state, id) =>
    fromList.getHashById(state.list, id)
;

export const getHashesEdit = state =>
    fromEdit.getHashesEdit(state.edit)
;

export const getHashesFormError = state =>
    fromError.getHashesFormError(state.error)
;
