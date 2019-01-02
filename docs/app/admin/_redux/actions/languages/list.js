
import {
    LANGUAGES_LIST_REQUEST,
    LANGUAGES_LIST_SUCCESS,
    LANGUAGES_LIST_FAILURE,
    LANGUAGES_LIST_REMOVE
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
    getLanguageById
} from '../../reducers';

export const languagesRequest = () => (dispatch, getState) => {

    dispatch(loaderOn());

    dispatch({
        type: LANGUAGES_LIST_REQUEST
    });

    return fetchJson('/endpoint/admin/languages', {
        always: () => dispatch(loaderOff())
    })
        .then(
            json => dispatch(languagesSuccess(json.list)),
            e => {
                errorHandler(dispatch)(e);
                dispatch(languagesFailure());
            }
        )
    ;
};

export const languagesDelete = id => (dispatch, getState) => {

    dispatch(loaderOn());

    const { name } = getLanguageById(getState(), id);

    return fetchJson('/endpoint/admin/languages/del/' + id, {
        method: 'DELETE',
        always: () => dispatch(loaderOff())
    })
        .then(json => {

            dispatch({
                type: LANGUAGES_LIST_REMOVE,
                payload: id
            });

            dispatch(notificationAdd('Language "' + name + '" deleted'));

        }, e => errorHandler(dispatch)(e))
    ;
};

export const languagesSuccess = list => ({
    type: LANGUAGES_LIST_SUCCESS,
    payload: list
});

export const languagesFailure = () => ({
    type: LANGUAGES_LIST_FAILURE
});

