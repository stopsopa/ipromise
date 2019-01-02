
import {
    REGIONS_LIST_REQUEST,
    REGIONS_LIST_SUCCESS,
    REGIONS_LIST_FAILURE,
    REGIONS_LIST_REMOVE
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
    getRegionById
} from '../../reducers';

export const regionsRequest = () => (dispatch, getState) => {

    dispatch(loaderOn());

    dispatch({
        type: REGIONS_LIST_REQUEST
    });

    return fetchJson('/endpoint/admin/regions', {
        always: () => dispatch(loaderOff())
    })
        .then(
            json => dispatch(regionsSuccess(json.list)),
            e => {
                errorHandler(dispatch)(e);
                dispatch(regionsFailure());
            }
        )
    ;
};

export const regionsDelete = id => (dispatch, getState) => {

    dispatch(loaderOn());

    const { name } = getRegionById(getState(), id);

    return fetchJson('/endpoint/admin/regions/del/' + id, {
        method: 'DELETE',
        always: () => dispatch(loaderOff())
    })
        .then(json => {

            dispatch({
                type: REGIONS_LIST_REMOVE,
                payload: id
            });

            dispatch(notificationAdd('Region "' + name + '" deleted'));

        }, e => errorHandler(dispatch)(e))
    ;
};

export const regionsSuccess = list => ({
    type: REGIONS_LIST_SUCCESS,
    payload: list
});

export const regionsFailure = () => ({
    type: REGIONS_LIST_FAILURE
});

