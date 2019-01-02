
import {
    LANGUAGES_EDIT_REQUEST,
    LANGUAGES_EDIT_SUCCESS,
    LANGUAGES_EDIT_FAILURE,
    LANGUAGES_EDIT_FIELD,
    LANGUAGES_EDIT_SAVE,
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
    languagesFormErrorSuccess
} from '../../actions';

import errorHandler from "../errorHandler";

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

export const languagesEditRequest = (id = '') => (dispatch, getState) => {

    id || (id = '')

    dispatch(loaderOn());

    dispatch({
        type: LANGUAGES_EDIT_REQUEST
    });

    const promise = fetchJson('/endpoint/admin/languages/get/' + id, {
        always: () => dispatch(loaderOff())
    });

    promise
        .then(json => {
            dispatch(languagesEditSuccess(json.entity)); // with keys 'entity' & 'errors'
            dispatch(languagesFormErrorSuccess(json.error))
        }, e => errorHandler(dispatch)(e))
    ;

    return promise;
};

export const languagesEditSave = data => (dispatch, getState) => {

    dispatch(loaderOn());

    const { id, name } = data; // create or edit mode? (id exist or not?)

    const promise = fetchJson('/endpoint/admin/languages/set', {
        method: 'post',
        body: data,
        always: () => dispatch(loaderOff())
    });

    promise
        .then(json => {

            dispatch(languagesEditSuccess(json.entity));
            dispatch(actions.languagesFormErrorSuccess(json.errors));

            if ( Object.keys(json.errors).length ) {

                dispatch(actions.notificationAdd(
                    "Validation error has been detected, please check the data in the form and submit again.",
                    'error'
                ));
            }
            else {

                setTimeout(() => dispatch(push("/admin/languages")), 0);

                dispatch(actions.notificationAdd(
                    `Language <b>"${name}"</b> changes has been ` + (id ? 'edited' : 'created')
                ));
            }
        }, e => errorHandler(dispatch)(e))
    ;

    return promise;
}

export const languagesEditSuccess = entity => ({
    type: LANGUAGES_EDIT_SUCCESS,
    payload: entity
});

export const languagesEditFailure = () => ({
    type: LANGUAGES_EDIT_FAILURE
});

export const languagesEditField = (key, value) => ({
    type: LANGUAGES_EDIT_FIELD,
    payload: {
        key,
        value
    }
});

