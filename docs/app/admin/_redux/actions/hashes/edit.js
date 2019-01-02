
import {
    HASHES_EDIT_REQUEST,
    HASHES_EDIT_SUCCESS,
    HASHES_EDIT_FAILURE,
    HASHES_EDIT_FIELD,
    HASHES_EDIT_SAVE,
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
    hashesFormErrorSuccess
} from '../../actions';

import errorHandler from "../errorHandler";

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

export const hashesEditRequest = (id = '') => (dispatch, getState) => {

    id || (id = '')

    dispatch(loaderOn());

    dispatch({
        type: HASHES_EDIT_REQUEST
    });

    const promise = fetchJson('/endpoint/admin/hashes/get/' + id, {
        always: () => dispatch(loaderOff())
    });

    promise
        .then(json => {
            // dispatch(loaderOff());
            dispatch(hashesEditSuccess(json.entity)); // with keys 'entity' & 'errors'
            dispatch(hashesFormErrorSuccess(json.error))
        }, e => {
            // errorHandler(dispatch)(e);
            // dispatch(hashesEditFailure());
        })
    ;

    return promise;
};

export const hashesEditSave = data => (dispatch, getState) => {

    dispatch(loaderOn());

    const { id, hashtag, source } = data; // create or edit mode? (id exist or not?)

    const promise = fetchJson('/endpoint/admin/hashes/set', {
        method: 'post',
        body: data,
        always: () => dispatch(loaderOff())
    });

    promise
        .then(json => {

            dispatch(hashesEditSuccess(json.entity));
            dispatch(actions.hashesFormErrorSuccess(json.errors));

            if ( Object.keys(json.errors).length ) {

                dispatch(actions.notificationAdd(
                    "Validation error has been detected, please check the data in the form and submit again.",
                    'error'
                ));
            }
            else {

                setTimeout(() => dispatch(push("/admin/hashes")), 0);

                dispatch(actions.notificationAdd(
                    `Hash <b>"${hashtag} - ${source}"</b> changes has been ` + (id ? 'edited' : 'created')
                ));
            }
        }, e => {
            errorHandler(dispatch)(e);
        })
    ;

    return promise;
}

export const hashesEditSuccess = entity => ({
    type: HASHES_EDIT_SUCCESS,
    payload: entity
});

export const hashesEditFailure = () => ({
    type: HASHES_EDIT_FAILURE
});

export const hashesEditField = (key, value) => ({
    type: HASHES_EDIT_FIELD,
    payload: {
        key,
        value
    }
});

