
import {
    ROLES_LIST_REQUEST,
    ROLES_LIST_SUCCESS,
    ROLES_LIST_FAILURE
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

export const rolesRequest = () => (dispatch, getState) => {

    dispatch(loaderOn());

    dispatch({
        type: ROLES_LIST_REQUEST
    });

    return fetchJson('/endpoint/admin/roles', {
        always: () => dispatch(loaderOff())
    })
        .then(json => {
            dispatch(rolesSuccess(json.list));
        }, e => {
            errorHandler(dispatch)(e);
            dispatch(rolesFailure());
        })
    ;
};

export const rolesSuccess = list => ({
    type: ROLES_LIST_SUCCESS,
    payload: list
});

export const rolesFailure = () => ({
    type: ROLES_LIST_FAILURE
});

