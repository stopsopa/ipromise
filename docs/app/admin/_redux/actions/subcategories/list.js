
import {
    SUBCATEGORIES_LIST_REQUEST,
    SUBCATEGORIES_LIST_SUCCESS,
    SUBCATEGORIES_LIST_FAILURE,
    SUBCATEGORIES_LIST_REMOVE
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
    getSubcategoryById
} from '../../reducers';

export const subcategoriesRequest = () => (dispatch, getState) => {

    dispatch(loaderOn());

    dispatch({
        type: SUBCATEGORIES_LIST_REQUEST
    });

    return fetchJson('/endpoint/admin/subcategories', {
        always: () => dispatch(loaderOff())
    })
        .then(
            json => dispatch(subcategoriesSuccess(json.list)),
            e => {
                errorHandler(dispatch)(e);
                dispatch(subcategoriesFailure());
            }
        )
    ;
};

export const subcategoriesDelete = id => (dispatch, getState) => {

    dispatch(loaderOn());

    const { name } = getSubcategoryById(getState(), id);

    return fetchJson('/endpoint/admin/subcategories/del/' + id, {
        method: 'DELETE',
        always: () => dispatch(loaderOff())
    })
        .then(json => {

            dispatch({
                type: SUBCATEGORIES_LIST_REMOVE,
                payload: id
            });

            selenium.dispatch('subcategoriesDelete', {
                deletedSubcategoryId: id
            })

            dispatch(notificationAdd('Subcategory "' + name + '" deleted'));

        }, e => {
            errorHandler(dispatch)(e);
            // dispatch(subcategoriesFailure());
        });
    ;
};

export const subcategoriesSuccess = list => ({
    type: SUBCATEGORIES_LIST_SUCCESS,
    payload: list
});

export const subcategoriesFailure = () => ({
    type: SUBCATEGORIES_LIST_FAILURE
});

