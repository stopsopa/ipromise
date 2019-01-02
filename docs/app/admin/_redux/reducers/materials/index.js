
import { combineReducers } from 'redux';

import list, * as fromList from './list';

import edit, * as fromEdit from './edit';

import error, * as fromError from './error';

import types, * as fromTypes from './types';

import filters, * as fromFilters from './filters';

export default combineReducers({
    edit,
    list,
    error,
    types,
    filters,
});

export const getMaterials = state =>
    fromList.getMaterials(state.list)
;

export const getMaterialById = (state, id) =>
    fromList.getMaterialById(state.list, id)
;

export const getMaterialsIdsInOrder = (state) =>
    fromList.getMaterialsIdsInOrder(state.list)
;

export const getMaterialsEdit = state =>
    fromEdit.getMaterialsEdit(state.edit)
;

export const getMaterialsFormError = state =>
    fromError.getMaterialsFormError(state.error)
;

export const getMaterialTypesForSelectField = state =>
    fromTypes.getMaterialTypesForSelectField(state.types)
;

export const getMaterialsFiltersForSelectField = state =>
    fromFilters.getMaterialsFiltersForSelectField(state.filters)
;
