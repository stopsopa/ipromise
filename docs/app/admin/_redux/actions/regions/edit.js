
import {
    REGIONS_EDIT_REQUEST,
    REGIONS_EDIT_SUCCESS,
    REGIONS_EDIT_FAILURE,
    REGIONS_EDIT_FIELD,
    REGIONS_EDIT_SAVE,
} from '../types';

import {
    fetchJson
} from 'transport';

import {
    loaderOff,
    loaderOn,
} from '../loader';

import * as actions from '../../actions';

import {
    regionsFormErrorSuccess
} from '../../actions';

import errorHandler from "../errorHandler";

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

export const regionsEditRequest = (id = '') => (dispatch, getState) => {

    id || (id = '')

    dispatch(loaderOn());

    dispatch({
        type: REGIONS_EDIT_REQUEST
    });

    const promise = fetchJson('/endpoint/admin/regions/get/' + id, {
        always: () => dispatch(loaderOff())
    });

    promise
        .then(json => {
            dispatch(regionsEditSuccess(json.entity)); // with keys 'entity' & 'errors'
            dispatch(regionsFormErrorSuccess(json.error))
        }, e => errorHandler(dispatch)(e))
    ;

    return promise;
};

export const regionsEditSave = data => (dispatch, getState) => {

    dispatch(loaderOn());

    const { id, name } = data; // create or edit mode? (id exist or not?)

    const promise = fetchJson('/endpoint/admin/regions/set', {
        method: 'post',
        body: data,
        always: () => dispatch(loaderOff())
    });

    promise
        .then(json => {

            dispatch(regionsEditSuccess(json.entity));
            dispatch(actions.regionsFormErrorSuccess(json.errors));

            if ( Object.keys(json.errors).length ) {

                dispatch(actions.notificationAdd(
                    "Validation error has been detected, please check the data in the form and submit again.",
                    'error'
                ));
            }
            else {

                setTimeout(() => dispatch(push("/admin/regions")), 0);

                dispatch(actions.notificationAdd(
                    `Region <b>"${name}"</b> changes has been ` + (id ? 'edited' : 'created')
                ));
            }
        }, e => errorHandler(dispatch)(e))
    ;

    return promise;
}

export const regionsEditSuccess = entity => ({
    type: REGIONS_EDIT_SUCCESS,
    payload: entity
});

export const regionsEditFailure = () => ({
    type: REGIONS_EDIT_FAILURE
});

export const regionsEditField = (key, value) => ({
    type: REGIONS_EDIT_FIELD,
    payload: {
        key,
        value
    }
});

