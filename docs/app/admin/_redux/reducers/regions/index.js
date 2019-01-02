
import { combineReducers } from 'redux';

import list, * as fromList from './list';

import edit, * as fromEdit from './edit';

import error, * as fromError from './error';

export default combineReducers({
    edit,
    list,
    error
});

export const getRegions = state =>
    fromList.getRegions(state.list)
;

export const getRegionsForSelectField = state =>
    fromList.getRegionsForSelectField(state.list)
;

export const getRegionById = (state, id) =>
    fromList.getRegionById(state.list, id)
;

export const getRegionsEdit = state =>
    fromEdit.getRegionsEdit(state.edit)
;

export const getRegionsFormError = state =>
    fromError.getRegionsFormError(state.error)
;
