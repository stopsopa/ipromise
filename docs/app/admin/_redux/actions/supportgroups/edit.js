
import {
    SUPPORTGROUPS_EDIT_REQUEST,
    SUPPORTGROUPS_EDIT_SUCCESS,
    SUPPORTGROUPS_EDIT_FAILURE,
    SUPPORTGROUPS_EDIT_FIELD,
    SUPPORTGROUPS_EDIT_SAVE,
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

import {
    supportGroupsFormErrorSuccess
} from '../../actions';

import errorHandler from "../errorHandler";

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

export const supportGroupsEditRequest = (id = '') => (dispatch, getState) => {

    id || (id = '')

    dispatch(loaderOn());

    dispatch({
        type: SUPPORTGROUPS_EDIT_REQUEST
    });

    const promise = fetchJson('/endpoint/admin/supportgroups/get/' + id, {
        always: () => dispatch(loaderOff())
    });

    promise
        .then(
            json => {
                dispatch(supportGroupsEditSuccess(json.entity)); // with keys 'entity' & 'errors'
                dispatch(supportGroupsFormErrorSuccess(json.error))
            },
            e => errorHandler(dispatch)(e)
        )
    ;

    return promise;
};

export const supportGroupsEditSave = (data) => (dispatch, getState) => {

    dispatch(loaderOn());

    const { id, name } = data; // create or edit mode? (id exist or not?)

    const promise = fetchJson('/endpoint/admin/supportgroups/set', {
        method: 'post',
        body: data,
        always: () => dispatch(loaderOff())
    });

    promise
        .then(json => {

            dispatch(supportGroupsEditSuccess(json.entity));
            dispatch(actions.supportGroupsFormErrorSuccess(json.errors));

            if ( Object.keys(json.errors).length ) {

                dispatch(actions.notificationAdd(
                    "Validation error has been detected, please check the data in the form and submit again.",
                    'error'
                ));
            }
            else {

                setTimeout(() => dispatch(push("/admin/supportgroups")), 0);

                let msg = `Support Groups has been `;

                if (name) {

                    msg = `Support Groups <b>"${name}"</b> changes has been `;
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

export const supportGroupsEditSuccess = entity => ({
    type: SUPPORTGROUPS_EDIT_SUCCESS,
    payload: entity
});

export const supportGroupsEditFailure = () => ({
    type: SUPPORTGROUPS_EDIT_FAILURE
});

export const supportGroupsEditField = (key, value) => ({
    type: SUPPORTGROUPS_EDIT_FIELD,
    payload: {
        key,
        value
    }
});

