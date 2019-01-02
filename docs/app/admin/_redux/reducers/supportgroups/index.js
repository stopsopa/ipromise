
import { combineReducers } from 'redux';

import list, * as fromList from './list';

import edit, * as fromEdit from './edit';

import error, * as fromError from './error';

export default combineReducers({
    edit,
    list,
    error
});

export const getSupportGroups = state =>
    fromList.getSupportGroups(state.list)
;

export const getSupportGroupById = (state, id) =>
    fromList.getSupportGroupById(state.list, id)
;

export const getSupportGroupsEdit = state =>
    fromEdit.getSupportGroupsEdit(state.edit)
;

export const getSupportGroupsFormError = state =>
    fromError.getSupportGroupsFormError(state.error)
;
