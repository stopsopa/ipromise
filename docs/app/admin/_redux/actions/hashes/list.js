
import {
    HASHES_LIST_REQUEST,
    HASHES_LIST_SUCCESS,
    HASHES_LIST_FAILURE,
    HASHES_LIST_REMOVE
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
    getHashById
} from '../../reducers';

export const hashesRequest = () => (dispatch, getState) => {

    dispatch(loaderOn());

    dispatch({
        type: HASHES_LIST_REQUEST
    });

    return fetchJson('/endpoint/admin/hashes', {
        always: () => dispatch(loaderOff())
    })
        .then(json => {
            dispatch(hashesSuccess(json.list));
        }, e => {
            errorHandler(dispatch)(e);
            dispatch(hashesFailure());
        })
    ;
};

export const hashesDelete = id => (dispatch, getState) => {

    dispatch(loaderOn());

    const { hashtag, source } = getHashById(getState(), id);

    return fetchJson('/endpoint/admin/hashes/del/' + id, {
        method: 'DELETE',
        always: () => dispatch(loaderOff())
    })
        .then(json => {

            dispatch({
                type: HASHES_LIST_REMOVE,
                payload: id
            });

            dispatch(notificationAdd('Hash "' + hashtag + " - " + source + '" deleted'));

        }, e => {
            errorHandler(dispatch)(e);
            // dispatch(hashesFailure());
        });
    ;
};

export const hashesSuccess = list => ({
    type: HASHES_LIST_SUCCESS,
    payload: list
});

export const hashesFailure = () => ({
    type: HASHES_LIST_FAILURE
});

