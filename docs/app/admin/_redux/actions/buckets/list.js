
import {
    BUCKETS_LIST_REQUEST,
    BUCKETS_LIST_SUCCESS,
    BUCKETS_LIST_FAILURE,
    BUCKETS_LIST_REMOVE
} from '../types';

import {
    loaderOn,
    loaderOff,
    notificationAdd
} from '../../actions';

import {
    fetchJson
} from 'transport';

import selenium from 'selenium';

import errorHandler from '../errorHandler';

import {
    getBucketById
} from '../../reducers';

export const bucketsRequest = () => (dispatch, getState) => {

    dispatch(loaderOn());

    dispatch({
        type: BUCKETS_LIST_REQUEST
    });

    return fetchJson('/endpoint/admin/buckets', {
        always: () => dispatch(loaderOff())
    })
        .then(
            json => dispatch(bucketsSuccess(json.list)),
            e => {
                errorHandler(dispatch)(e);
                dispatch(bucketsFailure());
            }
        )
    ;
};

export const bucketsDelete = id => (dispatch, getState) => {

    dispatch(loaderOn());

    const { name } = getBucketById(getState(), id);

    return fetchJson('/endpoint/admin/buckets/del/' + id, {
        method: 'DELETE',
        always: () => dispatch(loaderOff())
    })
        .then(json => {

            dispatch({
                type: BUCKETS_LIST_REMOVE,
                payload: id
            });

            selenium.dispatch('bucketsDelete', {
                deletedCategoryId: id
            })

            dispatch(notificationAdd('Bucket "' + name + '" deleted'));

        }, e => {
            errorHandler(dispatch)(e);
            // dispatch(bucketsFailure());
        });
    ;
};

export const bucketsSuccess = list => ({
    type: BUCKETS_LIST_SUCCESS,
    payload: list
});

export const bucketsFailure = () => ({
    type: BUCKETS_LIST_FAILURE
});

