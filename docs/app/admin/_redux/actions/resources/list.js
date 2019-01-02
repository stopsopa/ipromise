
import {
    RESOURCES_LIST_REQUEST,
    RESOURCES_LIST_SUCCESS,
    RESOURCES_LIST_FAILURE,
    RESOURCES_LIST_REMOVE
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
    getResourceById
} from '../../reducers';

export const resourcesRequest = () => (dispatch, getState) => {

    dispatch(loaderOn());

    dispatch({
        type: RESOURCES_LIST_REQUEST
    });

    return fetchJson('/endpoint/admin/resources', {
        always: () => dispatch(loaderOff())
    })
        .then(
            json => dispatch(resourcesSuccess(json.list)),
            e => {
                errorHandler(dispatch)(e);
                dispatch(resourcesFailure());
            }
        )
    ;
};

export const resourcesDelete = id => (dispatch, getState) => {

    dispatch(loaderOn());

    const { filename: name } = getResourceById(getState(), id);

    return fetchJson('/endpoint/admin/resources/del/' + id, {
        method: 'DELETE',
        always: () => dispatch(loaderOff())
    })
        .then(json => {

            dispatch({
                type: RESOURCES_LIST_REMOVE,
                payload: id
            });

            dispatch(notificationAdd('Resource "' + name + '" deleted'));

        }, e => {
            errorHandler(dispatch)(e);
            // dispatch(resourcesFailure());
        });
    ;
};

export const resourcesSuccess = list => ({
    type: RESOURCES_LIST_SUCCESS,
    payload: list
});

export const resourcesFailure = () => ({
    type: RESOURCES_LIST_FAILURE
});

