
import { combineReducers } from 'redux';

import list, * as fromList from './list';

import edit, * as fromEdit from './edit';

import error, * as fromError from './error';

import filters, * as fromFilters from './filters';

export default combineReducers({
    edit,
    list,
    error,
    filters,
});

export const getBuckets = state =>
    fromList.getBuckets(state.list)
;

export const getBucketsForSelectField = state =>
    fromList.getBucketsForSelectField(state.list)
;

export const getBucketsForSelectFieldEnabled = state =>
    fromList.getBucketsForSelectFieldEnabled(state.list)
;

export const getBucketById = (state, id) =>
    fromList.getBucketById(state.list, id)
;

export const getBucketsEdit = state =>
    fromEdit.getBucketsEdit(state.edit)
;

export const getBucketsFormError = state =>
    fromError.getBucketsFormError(state.error)
;

export const getBucketFiltersForSelectField = state =>
    fromFilters.getBucketFiltersForSelectField(state.filters)
;
