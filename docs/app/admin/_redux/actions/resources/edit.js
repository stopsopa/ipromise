
import {
    RESOURCES_EDIT_REQUEST,
    RESOURCES_EDIT_SUCCESS,
    RESOURCES_EDIT_FAILURE,
    RESOURCES_EDIT_FIELD,
    RESOURCES_EDIT_SAVE,
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
    resourcesFormErrorSuccess
} from '../../actions';

import errorHandler from "../errorHandler";

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

export const resourcesEditRequest = (id = '') => (dispatch, getState) => {

    id || (id = '')

    dispatch(loaderOn());

    dispatch({
        type: RESOURCES_EDIT_REQUEST
    });

    const promise = fetchJson('/endpoint/admin/resources/get/' + id, {
        always: () => dispatch(loaderOff())
    });

    promise
        .then(
            json => {
                dispatch(resourcesEditSuccess(json.entity)); // with keys 'entity' & 'errors'
                dispatch(resourcesFormErrorSuccess(json.error))
            },
            e => errorHandler(dispatch)(e)
        )
    ;

    return promise;
};

export const resourcesEditSave = (data, file, activateTabByName) => (dispatch, getState) => {

    const uploadKey = 'upload';

    dispatch(loaderOn());

    const { id, filename: name } = data; // create or edit mode? (id exist or not?)

    // https://react-dropzone.js.org/
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Uploading_a_file
    var formData = new FormData();

    formData.append('json', JSON.stringify(data, null, '    '));

    return fetchData('/endpoint/admin/resources/set?just-validate-form-dont-send-file-yet', {
        method: 'post',
        body: formData,
        real: true
    })
        .then(res => res.json())
        .then(json => {

            dispatch(resourcesEditSuccess(json.entity));
            dispatch(actions.resourcesFormErrorSuccess(json.errors));

            if ( Object.keys(json.errors).length ) {

                dispatch(actions.notificationAdd(
                    "Validation error has been detected, please check the data in the form and submit again.",
                    'error'
                ));

                dispatch(loaderOff())

                return;
            }
            else {

                file && formData.append(uploadKey, file);

                return fetchData('/endpoint/admin/resources/set?uploadKey=' + uploadKey, {
                    method: 'post',
                    body: formData,
                    always: () => dispatch(loaderOff()),
                    real: true
                })
                .then(res => res.json())
            }
        })
        .then(json => {

            if ( ! json) {

                return Promise.resolve();
            }

            dispatch(resourcesEditSuccess(json.entity));
            dispatch(actions.resourcesFormErrorSuccess(json.errors));

            if ( Object.keys(json.errors).length ) {

                dispatch(actions.notificationAdd(
                    "Validation error has been detected, please check the data in the form and submit again.",
                    'error'
                ));
            }
            else {

                //setTimeout(() => dispatch(push("/admin/resources")), 0);
                if (activateTabByName) {
                    activateTabByName('resource');
                }
                else {
                    log(`function activateTabByName doesn't exist`);
                }

                let msg = `Resource has been `;

                if (name) {

                    msg = `Resource <b>"${name}"</b> changes has been `;
                }

                msg += (id ? 'edited' : 'created');

                dispatch(actions.notificationAdd(msg));
            }

            return Promise.resolve();
        })
        .catch(e => {
            errorHandler(dispatch)(e)
            dispatch(loaderOff());
        })
    ;
}

export const resourcesEditSuccess = entity => ({
    type: RESOURCES_EDIT_SUCCESS,
    payload: entity
});

export const resourcesEditFailure = () => ({
    type: RESOURCES_EDIT_FAILURE
});

export const resourcesEditField = (key, value) => ({
    type: RESOURCES_EDIT_FIELD,
    payload: {
        key,
        value
    }
});

