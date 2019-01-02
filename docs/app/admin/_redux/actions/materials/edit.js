
import {
    MATERIALS_EDIT_REQUEST,
    MATERIALS_EDIT_SUCCESS,
    MATERIALS_EDIT_FAILURE,
    MATERIALS_EDIT_FIELD,
    MATERIALS_EDIT_SAVE,
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
    materialsFormErrorSuccess
} from '../../actions';

import errorHandler from "../errorHandler";

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';

export const materialsEditRequest = (id = '') => (dispatch, getState) => {

    id || (id = '')

    dispatch(loaderOn());

    dispatch({
        type: MATERIALS_EDIT_REQUEST
    });

    const promise = fetchJson('/endpoint/admin/materials/get/' + id, {
        always: () => dispatch(loaderOff())
    });

    promise
        .then(
            json => {
                dispatch(materialsEditSuccess(json.entity)); // with keys 'entity' & 'errors'
                dispatch(materialsFormErrorSuccess(json.error))
            },
            e => errorHandler(dispatch)(e)
        )
    ;

    return promise;
};

export const materialsEditSave = (data, file) => (dispatch, getState) => {

    const uploadKey = 'upload';

    dispatch(loaderOn());

    const { id, filename: name } = data; // create or edit mode? (id exist or not?)

    const promise = fetchJson('/endpoint/admin/materials/set', {
        method: 'post',
        body: data,
        always: () => dispatch(loaderOff())
    });

    promise
        .then(json => {

            dispatch(materialsEditSuccess(json.entity));
            dispatch(actions.materialsFormErrorSuccess(json.errors));

            if ( Object.keys(json.errors).length ) {

                dispatch(actions.notificationAdd(
                    "Validation error has been detected, please check the data in the form and submit again.",
                    'error'
                ));
            }
            else {

                setTimeout(() => dispatch(push("/admin/materials")), 0);

                let msg = `Material has been `;

                if (name) {

                    msg = `Material <b>"${name}"</b> changes has been `;
                }

                msg += (id ? 'edited' : 'created');

                dispatch(actions.notificationAdd(msg));
            }
        }, e => {
            errorHandler(dispatch)(e);
        })
    ;

    return promise;
}


export const materialsEditSuccess = entity => ({
    type: MATERIALS_EDIT_SUCCESS,
    payload: entity
});

export const materialsEditFailure = () => ({
    type: MATERIALS_EDIT_FAILURE
});

export const materialsEditField = (key, value) => ({
    type: MATERIALS_EDIT_FIELD,
    payload: {
        key,
        value
    }
});