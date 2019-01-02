
import {
    ACTIVITYWALL_LIST_REQUEST,
    ACTIVITYWALL_LIST_SUCCESS,
    ACTIVITYWALL_LIST_FAILURE,
    ACTIVITYWALL_LIST_REMOVE,
    ACTIVITYWALL_EDIT_SUCCESS,
    ACTIVITYWALL_LIST_CHANGE,
} from '../types';

import {
    loaderOn,
    loaderOff,
} from '../../actions';

import {
    fetchJson
} from 'transport';

import errorHandler from '../errorHandler';

// import {notificationAdd} from "../index";

export const activitywallRequest = () => (dispatch, getState) => {

    dispatch(loaderOn());

    dispatch({
        type: ACTIVITYWALL_LIST_REQUEST
    });

    return fetchJson('/endpoint/admin/activitywall', {
        always: () => dispatch(loaderOff())
    })
        .then(json => {
            dispatch(activitywallSuccess(json.list));
        }, e => {
            errorHandler(dispatch)(e);
            dispatch(activitywallFailure());
        })
    ;
};
export const activitywallEnable = (id, status) => (dispatch, getState) => {

    dispatch(loaderOn());

    return fetchJson('/endpoint/admin/activitywall/set', {
        method: 'POST',
        body: {
            id:id,
            enabled: status
        },
        always: () => dispatch(loaderOff())
    })
        .then(json => {

            dispatch(activitywallListChange(json.entity));

            // dispatch(notificationAdd('Hash "' + hashtag + " - " + source + '" deleted'));

        }, e => {
            errorHandler(dispatch)(e);
            // dispatch(hashesFailure());
        });
    ;
}

export const activitywallSuccess = list => ({
    type: ACTIVITYWALL_LIST_SUCCESS,
    payload: list
});

export const activitywallListChange = entity => ({
    type: ACTIVITYWALL_LIST_CHANGE,
    payload: entity
});

export const activitywallFailure = () => ({
    type: ACTIVITYWALL_LIST_FAILURE
});

