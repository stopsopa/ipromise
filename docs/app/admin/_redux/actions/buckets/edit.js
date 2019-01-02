
import {
    BUCKETS_EDIT_REQUEST,
    BUCKETS_EDIT_SUCCESS,
    BUCKETS_EDIT_FAILURE,
    BUCKETS_EDIT_FIELD,
    BUCKETS_EDIT_SAVE,
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
    bucketsFormErrorSuccess
} from './error';

import errorHandler from "../errorHandler";

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

export const bucketsEditRequest = (id = '') => (dispatch, getState) => {

    id || (id = '')

    dispatch(loaderOn());

    dispatch({
        type: BUCKETS_EDIT_REQUEST
    });

    const promise = fetchJson('/endpoint/admin/buckets/get/' + id, {
        always: () => dispatch(loaderOff())
    });

    promise
        .then(json => {
            dispatch(bucketsEditSuccess(json.entity)); // with keys 'entity' & 'errors'
            dispatch(bucketsFormErrorSuccess(json.error))
        }, e => errorHandler(dispatch)(e))
    ;

    return promise;
};

export const bucketsEditSave = data => (dispatch, getState) => {

    dispatch(loaderOn());

    const { id, name } = data; // create or edit mode? (id exist or not?)

    const promise = fetchJson('/endpoint/admin/buckets/set', {
        method: 'post',
        body: data,
        always: () => dispatch(loaderOff())
    });

    promise
        .then(async json => {

            let returnedData = dispatch(bucketsEditSuccess(json.entity));
            dispatch(actions.bucketsFormErrorSuccess(json.errors));

            if ( Object.keys(json.errors).length ) {

                dispatch(actions.notificationAdd(
                    "Validation error has been detected, please check the data in the form and submit again.",
                    'error'
                ));

                selenium.dispatch('bucketsEditSave', {
                    createErrorsNum: Object.keys(json.errors).length
                })
            }
            else {

                setTimeout(() => dispatch(push("/admin/buckets")), 0);

                returnedData = await returnedData;

                selenium.dispatch('bucketsEditSave', {
                    createdId: returnedData.payload.id,
                    createdName: returnedData.payload.name,
                    mode: id ? 'edited' : 'created'
                })

                dispatch(actions.notificationAdd(
                    `Bucket <b>"${name}"</b> changes has been ` + (id ? 'edited' : 'created')
                ));
            }
        }, e => errorHandler(dispatch)(e))
    ;

    return promise;
}

export const bucketsEditSuccess = entity => ({
    type: BUCKETS_EDIT_SUCCESS,
    payload: entity
});

export const bucketsEditFailure = () => ({
    type: BUCKETS_EDIT_FAILURE
});

export const bucketsEditField = (key, value) => ({
    type: BUCKETS_EDIT_FIELD,
    payload: {
        key,
        value
    }
});

