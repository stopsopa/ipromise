
import {
    INDICATIONS_EDIT_REQUEST,
    INDICATIONS_EDIT_SUCCESS,
    INDICATIONS_EDIT_FAILURE,
    INDICATIONS_EDIT_FIELD,
    INDICATIONS_EDIT_SAVE,
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
    indicationsFormErrorSuccess
} from '../../actions';

import errorHandler from "../errorHandler";

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

export const indicationsEditRequest = (id = '') => (dispatch, getState) => {

    id || (id = '')

    dispatch(loaderOn());

    dispatch({
        type: INDICATIONS_EDIT_REQUEST
    });

    const promise = fetchJson('/endpoint/admin/indications/get/' + id, {
        always: () => dispatch(loaderOff())
    });

    promise
        .then(json => {
            dispatch(indicationsEditSuccess(json.entity)); // with keys 'entity' & 'errors'
            dispatch(indicationsFormErrorSuccess(json.error))
        }, e => errorHandler(dispatch)(e))
    ;

    return promise;
};

export const indicationsEditSave = data => (dispatch, getState) => {

    dispatch(loaderOn());

    const { id, name } = data; // create or edit mode? (id exist or not?)

    const promise = fetchJson('/endpoint/admin/indications/set', {
        method: 'post',
        body: data,
        always: () => dispatch(loaderOff())
    });

    promise
        .then(json => {

            dispatch(indicationsEditSuccess(json.entity));
            dispatch(actions.indicationsFormErrorSuccess(json.errors));

            if ( Object.keys(json.errors).length ) {

                dispatch(actions.notificationAdd(
                    "Validation error has been detected, please check the data in the form and submit again.",
                    'error'
                ));
            }
            else {

                setTimeout(() => dispatch(push("/admin/indications")), 0);

                dispatch(actions.notificationAdd(
                    `Indication <b>"${name}"</b> changes has been ` + (id ? 'edited' : 'created')
                ));
            }
        }, e => errorHandler(dispatch)(e))
    ;

    return promise;
}

export const indicationsEditSuccess = entity => ({
    type: INDICATIONS_EDIT_SUCCESS,
    payload: entity
});

export const indicationsEditFailure = () => ({
    type: INDICATIONS_EDIT_FAILURE
});

export const indicationsEditField = (key, value) => ({
    type: INDICATIONS_EDIT_FIELD,
    payload: {
        key,
        value
    }
});

