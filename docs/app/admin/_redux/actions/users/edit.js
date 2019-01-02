
import {
    USERS_EDIT_REQUEST,
    USERS_EDIT_SUCCESS,
    USERS_EDIT_FAILURE,
    USERS_EDIT_FIELD,
    USERS_EDIT_SAVE,
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
    usersFormErrorSuccess
} from '../../actions';

import errorHandler from "../errorHandler";

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

export const usersEditRequest = (id = '') => (dispatch, getState) => {

    id || (id = '')

    dispatch(loaderOn());

    dispatch({
        type: USERS_EDIT_REQUEST
    });

    const promise = fetchJson('/endpoint/admin/users/get/' + id, {
        always: () => dispatch(loaderOff())
    });

    promise
        .then(json => {
            // dispatch(loaderOff());
            dispatch(usersEditSuccess(json.entity)); // with keys 'entity' & 'errors'
            dispatch(usersFormErrorSuccess(json.error))
        }, e => {
            // errorHandler(dispatch)(e);
            // dispatch(usersEditFailure());
        })
    ;

    return promise;
};

export const usersEditSave = data => (dispatch, getState) => {

    dispatch(loaderOn());

    const { id, firstName, lastName } = data; // create or edit mode? (id exist or not?)

    const promise = fetchJson('/endpoint/admin/users/set', {
        method: 'post',
        body: data,
        always: () => dispatch(loaderOff())
    });

    promise
        .then(json => {

            dispatch(usersEditSuccess(json.entity));
            dispatch(actions.usersFormErrorSuccess(json.errors));

            if ( Object.keys(json.errors).length ) {

                dispatch(actions.notificationAdd(
                    "Validation error has been detected, please check the data in the form and submit again.",
                    'error'
                ));
            }
            else {

                setTimeout(() => dispatch(push("/admin/users")), 0);

                dispatch(actions.notificationAdd(
                    `User <b>"${firstName} ${lastName}"</b> changes has been ` + (id ? 'edited' : 'created')
                ));
            }
        }, e => {
            errorHandler(dispatch)(e);
        })
    ;

    return promise;
}

export const usersEditSuccess = entity => ({
    type: USERS_EDIT_SUCCESS,
    payload: entity
});

export const usersEditFailure = () => ({
    type: USERS_EDIT_FAILURE
});

export const usersEditField = (key, value) => ({
    type: USERS_EDIT_FIELD,
    payload: {
        key,
        value
    }
});

