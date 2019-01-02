
import {
    SUPPORTGROUPS_LIST_REQUEST,
    SUPPORTGROUPS_LIST_SUCCESS,
    SUPPORTGROUPS_LIST_FAILURE,
    SUPPORTGROUPS_LIST_REMOVE
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
    getSupportGroupById
} from '../../reducers';

export const supportGroupsRequest = () => (dispatch, getState) => {

    dispatch(loaderOn());

    dispatch({
        type: SUPPORTGROUPS_LIST_REQUEST
    });

    return fetchJson('/endpoint/admin/supportgroups', {
        always: () => dispatch(loaderOff())
    })
        .then(
            json => dispatch(supportGroupsSuccess(json.list)),
            e => {
                errorHandler(dispatch)(e);
                dispatch(supportGroupsFailure());
            }
        )
    ;
};

export const supportGroupsDelete = id => (dispatch, getState) => {

    dispatch(loaderOn());

    const { name } = getSupportGroupById(getState(), id);

    return fetchJson('/endpoint/admin/supportgroups/del/' + id, {
        method: 'DELETE',
        always: () => dispatch(loaderOff())
    })
        .then(json => {

            dispatch({
                type: SUPPORTGROUPS_LIST_REMOVE,
                payload: id
            });

            dispatch(notificationAdd('SupportGroup "' + name + '" deleted'));

        }, e => {
            errorHandler(dispatch)(e);
            // dispatch(supportGroupsFailure());
        });
    ;
};

export const supportGroupsSuccess = list => ({
    type: SUPPORTGROUPS_LIST_SUCCESS,
    payload: list
});

export const supportGroupsFailure = () => ({
    type: SUPPORTGROUPS_LIST_FAILURE
});

