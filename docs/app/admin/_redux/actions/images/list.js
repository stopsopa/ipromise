
import {
    IMAGES_LIST_REQUEST,
    IMAGES_LIST_SUCCESS,
    IMAGES_LIST_FAILURE,
    IMAGES_LIST_REMOVE
} from '../types';

import {
    loaderOn,
    loaderOff,
    notificationAdd
} from '../../actions';

import {
    fetchJson
} from 'transport';

import errorHandler from '../errorHandler';

import {
    getImageById
} from '../../reducers';

export const imagesRequest = () => (dispatch, getState) => {

    dispatch(loaderOn());

    dispatch({
        type: IMAGES_LIST_REQUEST
    });

    return fetchJson('/endpoint/admin/images', {
        always: () => dispatch(loaderOff())
    })
        .then(
            json => dispatch(imagesSuccess(json.list)),
            e => {
                errorHandler(dispatch)(e);
                dispatch(imagesFailure());
            }
        )
    ;
};

export const imagesDelete = id => (dispatch, getState) => {

    dispatch(loaderOn());

    const { filename: name } = getImageById(getState(), id);

    return fetchJson('/endpoint/admin/images/del/' + id, {
        method: 'DELETE',
        always: () => dispatch(loaderOff())
    })
        .then(json => {

            dispatch({
                type: IMAGES_LIST_REMOVE,
                payload: id
            });

            dispatch(notificationAdd('Image "' + name + '" deleted'));

        }, e => {
            errorHandler(dispatch)(e);
            // dispatch(imagesFailure());
        });
    ;
};

export const imagesSuccess = list => ({
    type: IMAGES_LIST_SUCCESS,
    payload: list
});

export const imagesFailure = () => ({
    type: IMAGES_LIST_FAILURE
});

