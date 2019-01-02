
import {
    USERS_LIST_REQUEST,
    USERS_LIST_SUCCESS,
    USERS_LIST_FAILURE,
    USERS_LIST_REMOVE
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
    getUserById
} from '../../reducers';

export const usersRequest = () => (dispatch, getState) => {

    dispatch(loaderOn());

    dispatch({
        type: USERS_LIST_REQUEST
    });

    return fetchJson('/endpoint/admin/users', {
        always: () => dispatch(loaderOff())
    })
        .then(json => {
            dispatch(usersSuccess(json.list));
        }, e => {
            errorHandler(dispatch)(e);
            dispatch(usersFailure());
        })
    ;
};

export const usersDelete = id => (dispatch, getState) => {

    dispatch(loaderOn());

    const { firstName, lastName } = getUserById(getState(), id);

    return fetchJson('/endpoint/admin/users/del/' + id, {
        method: 'DELETE',
        always: () => dispatch(loaderOff())
    })
        .then(json => {

            dispatch({
                type: USERS_LIST_REMOVE,
                payload: id
            });

            dispatch(notificationAdd('User "' + firstName + " " + lastName + '" deleted'));

        }, e => {
            errorHandler(dispatch)(e);
            // dispatch(usersFailure());
        });
    ;
};

export const usersSuccess = list => ({
    type: USERS_LIST_SUCCESS,
    payload: list
});

export const usersFailure = () => ({
    type: USERS_LIST_FAILURE
});

