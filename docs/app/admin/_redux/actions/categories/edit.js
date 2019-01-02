
import {
    CATEGORIES_EDIT_REQUEST,
    CATEGORIES_EDIT_SUCCESS,
    CATEGORIES_EDIT_FAILURE,
    CATEGORIES_EDIT_FIELD,
    CATEGORIES_EDIT_SAVE,
} from '../types';

import {
    fetchJson
} from 'transport';

import {
    loaderOff,
    loaderOn,
} from '../loader';

import * as actions from '../../actions';

import selenium from 'selenium';

import {
    categoriesFormErrorSuccess
} from '../../actions';

import errorHandler from "../errorHandler";

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

export const categoriesEditRequest = (id = '') => (dispatch, getState) => {

    id || (id = '')

    dispatch(loaderOn());

    dispatch({
        type: CATEGORIES_EDIT_REQUEST
    });

    const promise = fetchJson('/endpoint/admin/categories/get/' + id, {
        always: () => dispatch(loaderOff())
    });

    promise
        .then(json => {
            // dispatch(loaderOff());
            dispatch(categoriesEditSuccess(json.entity)); // with keys 'entity' & 'errors'
            dispatch(categoriesFormErrorSuccess(json.error))
        }, e => {
            // errorHandler(dispatch)(e);
            // dispatch(categoriesEditFailure());
        })
    ;

    return promise;
};

export const categoriesEditSave = data => (dispatch, getState) => {

    dispatch(loaderOn());

    const { id, name } = data; // create or edit mode? (id exist or not?)

    const promise = fetchJson('/endpoint/admin/categories/set', {
        method: 'post',
        body: data,
        always: () => dispatch(loaderOff())
    });

    promise
        .then(async json => {

            let returnedData = dispatch(categoriesEditSuccess(json.entity));
            dispatch(actions.categoriesFormErrorSuccess(json.errors));

            if ( Object.keys(json.errors).length ) {

                dispatch(actions.notificationAdd(
                    "Validation error has been detected, please check the data in the form and submit again.",
                    'error'
                ));

                selenium.dispatch('categoriesEditSave', {
                    createErrorsNum: Object.keys(json.errors).length
                })
            }
            else {

                setTimeout(() => dispatch(push("/admin/categories")), 0);

                returnedData = await returnedData;

                selenium.dispatch('categoriesEditSave', {
                    createdId: returnedData.payload.id,
                    createdName: returnedData.payload.name,
                    mode: id ? 'edited' : 'created'
                })

                dispatch(actions.notificationAdd(
                    `Category <b>"${name}"</b> changes has been ` + (id ? 'edited' : 'created')
                ));
            }
        }, e => {
            errorHandler(dispatch)(e);
        })
    ;

    return promise;
}

export const categoriesEditSuccess = entity => ({
    type: CATEGORIES_EDIT_SUCCESS,
    payload: entity
});

export const categoriesEditFailure = () => ({
    type: CATEGORIES_EDIT_FAILURE
});

export const categoriesEditField = (key, value) => ({
    type: CATEGORIES_EDIT_FIELD,
    payload: {
        key,
        value
    }
});

