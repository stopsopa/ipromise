
import {
    SUBCATEGORIES_EDIT_REQUEST,
    SUBCATEGORIES_EDIT_SUCCESS,
    SUBCATEGORIES_EDIT_FAILURE,
    SUBCATEGORIES_EDIT_FIELD,
    SUBCATEGORIES_EDIT_SAVE,
} from '../types';

import {
    fetchData,
    fetchJson
} from 'transport';

import {
    loaderOff,
    loaderOn,
} from '../loader';

import * as actions from '../../actions';

import selenium from 'selenium';

import {
    subcategoriesFormErrorSuccess
} from '../../actions';

import errorHandler from "../errorHandler";

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

export const subcategoriesEditRequest = (id = '') => (dispatch, getState) => {

    id || (id = '')

    dispatch(loaderOn());

    dispatch({
        type: SUBCATEGORIES_EDIT_REQUEST
    });

    const promise = fetchJson('/endpoint/admin/subcategories/get/' + id, {
        always: () => dispatch(loaderOff())
    });

    promise
        .then(
            json => {
                dispatch(subcategoriesEditSuccess(json.entity)); // with keys 'entity' & 'errors'
                dispatch(subcategoriesFormErrorSuccess(json.error))
            },
            e => errorHandler(dispatch)(e)
        )
    ;

    return promise;
};

export const subcategoriesEditSave = (data) => (dispatch, getState) => {

    dispatch(loaderOn());

    const { id, name } = data; // create or edit mode? (id exist or not?)

    const promise = fetchJson('/endpoint/admin/subcategories/set', {
        method: 'post',
        body: data,
        always: () => dispatch(loaderOff())
    });

    promise
        .then(async json => {

            let returnedData = dispatch(subcategoriesEditSuccess(json.entity));

            dispatch(actions.subcategoriesFormErrorSuccess(json.errors));

            if ( Object.keys(json.errors).length ) {

                dispatch(actions.notificationAdd(
                    "Validation error has been detected, please check the data in the form and submit again.",
                    'error'
                ));

                selenium.dispatch('subcategoriesEditSave', {
                    createErrorsNum: Object.keys(json.errors).length
                })
            }
            else {

                setTimeout(() => dispatch(push("/admin/subcategories")), 0);

                let msg = `Subcategory has been `;

                if (name) {

                    msg = `Subcategory <b>"${name}"</b> changes has been `;
                }

                msg += (id ? 'edited' : 'created');

                returnedData = await returnedData;

                selenium.dispatch('subcategoriesEditSave', {
                    createdId: returnedData.payload.id,
                    createdName: returnedData.payload.name,
                    mode: id ? 'edited' : 'created'
                })

                dispatch(actions.notificationAdd(msg));
            }
        }, e => {
            errorHandler(dispatch)(e);
        })
    ;

    return promise;
}

export const subcategoriesEditSuccess = entity => ({
    type: SUBCATEGORIES_EDIT_SUCCESS,
    payload: entity
});

export const subcategoriesEditFailure = () => ({
    type: SUBCATEGORIES_EDIT_FAILURE
});

export const subcategoriesEditField = (key, value) => ({
    type: SUBCATEGORIES_EDIT_FIELD,
    payload: {
        key,
        value
    }
});

