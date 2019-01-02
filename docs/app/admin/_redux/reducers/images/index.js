
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

export const getImagesSavedFlag = state =>
    fromSaved.getImagesSavedFlag(state.saved)
;

export const getImages = state =>
    fromList.getImages(state.list)
;

export const getImagesForSelectField = state =>
    fromList.getImagesForSelectField(state.list)
;

export const getImageById = (state, id) =>
    fromList.getImageById(state.list, id)
;

export const getImagesEdit = state =>
    fromEdit.getImagesEdit(state.edit)
;

export const getImagesFormError = state =>
    fromError.getImagesFormError(state.error)
;

