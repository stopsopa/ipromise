
import {
    CATEGORIES_LIST_REQUEST,
    CATEGORIES_LIST_SUCCESS,
    CATEGORIES_LIST_FAILURE,
    CATEGORIES_LIST_REMOVE
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

import selenium from 'selenium';

import {
    getCategoryById
} from '../../reducers';

export const categoriesRequest = () => (dispatch, getState) => {

    dispatch(loaderOn());

    dispatch({
        type: CATEGORIES_LIST_REQUEST
    });

    return fetchJson('/endpoint/admin/categories', {
        always: () => dispatch(loaderOff())
    })
        .then(json => {
            dispatch(categoriesSuccess(json.list));
        }, e => {
            errorHandler(dispatch)(e);
            dispatch(categoriesFailure());
        })
    ;
};

export const categoriesDelete = id => (dispatch, getState) => {

    dispatch(loaderOn());

    const { name } = getCategoryById(getState(), id);

    return fetchJson('/endpoint/admin/categories/del/' + id, {
        method: 'DELETE',
        always: () => dispatch(loaderOff())
    })
        .then(json => {

            dispatch({
                type: CATEGORIES_LIST_REMOVE,
                payload: id
            });

            selenium.dispatch('categoriesDelete', {
                deletedCategoryId: id
            })

            dispatch(notificationAdd('Category "' + name + '" deleted'));

        }, e => {
            errorHandler(dispatch)(e);
            // dispatch(categoriesFailure());
        });
    ;
};

export const categoriesSuccess = list => ({
    type: CATEGORIES_LIST_SUCCESS,
    payload: list
});

export const categoriesFailure = () => ({
    type: CATEGORIES_LIST_FAILURE
});

