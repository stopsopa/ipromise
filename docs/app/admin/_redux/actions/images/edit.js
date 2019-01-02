
import {
    IMAGES_EDIT_REQUEST,
    IMAGES_EDIT_SUCCESS,
    IMAGES_EDIT_FAILURE,
    IMAGES_EDIT_FIELD,
    IMAGES_EDIT_SAVE,
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
    imagesFormErrorSuccess
} from '../../actions';

import errorHandler from "../errorHandler";

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

export const imagesEditRequest = (id = '') => (dispatch, getState) => {

    id || (id = '')

    dispatch(loaderOn());

    dispatch({
        type: IMAGES_EDIT_REQUEST
    });

    const promise = fetchJson('/endpoint/admin/images/get/' + id, {
        always: () => dispatch(loaderOff())
    });

    promise
        .then(
            json => {
                dispatch(imagesEditSuccess(json.entity)); // with keys 'entity' & 'errors'
                dispatch(imagesFormErrorSuccess(json.error))
            },
            e => errorHandler(dispatch)(e)
        )
    ;

    return promise;
};

export const imagesEditSave = (data, file, activateTabByName) => (dispatch, getState) => {

    const uploadKey = 'upload';

    dispatch(loaderOn());

    const { id, filename: name } = data; // create or edit mode? (id exist or not?)

    // https://react-dropzone.js.org/
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Uploading_a_file
    var formData = new FormData();

    formData.append('json', JSON.stringify(data, null, '    '));

    return fetchData('/endpoint/admin/images/set?just-validate-form-dont-send-file-yet', {
        method: 'post',
        body: formData,
        real: true
    })
        .then(res => res.json())
        .then(json => {

            dispatch(imagesEditSuccess(json.entity));
            dispatch(actions.imagesFormErrorSuccess(json.errors));

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

                return fetchData('/endpoint/admin/images/set?uploadKey=' + uploadKey, {
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

            dispatch(imagesEditSuccess(json.entity));
            dispatch(actions.imagesFormErrorSuccess(json.errors));

            if ( Object.keys(json.errors).length ) {

                dispatch(actions.notificationAdd(
                    "Validation error has been detected, please check the data in the form and submit again.",
                    'error'
                ));
            }
            else {

                //setTimeout(() => dispatch(push("/admin/images")), 0);
                if (activateTabByName) {
                    activateTabByName('images');
                }
                else {
                    log(`function activateTabByName doesn't exist`);
                }

                let msg = `Image has been `;

                if (name) {

                    msg = `Image <b>"${name}"</b> changes has been `;
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

export const imagesEditSuccess = entity => ({
    type: IMAGES_EDIT_SUCCESS,
    payload: entity
});

export const imagesEditFailure = () => ({
    type: IMAGES_EDIT_FAILURE
});

export const imagesEditField = (key, value) => ({
    type: IMAGES_EDIT_FIELD,
    payload: {
        key,
        value
    }
});

