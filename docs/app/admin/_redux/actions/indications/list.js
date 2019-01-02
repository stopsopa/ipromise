
import {
    INDICATIONS_LIST_REQUEST,
    INDICATIONS_LIST_SUCCESS,
    INDICATIONS_LIST_FAILURE,
    INDICATIONS_LIST_REMOVE
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
    getIndicationById
} from '../../reducers';

export const indicationsRequest = () => (dispatch, getState) => {

    dispatch(loaderOn());

    dispatch({
        type: INDICATIONS_LIST_REQUEST
    });

    return fetchJson('/endpoint/admin/indications', {
        always: () => dispatch(loaderOff())
    })
        .then(
            json => dispatch(indicationsSuccess(json.list)),
            e => {
                errorHandler(dispatch)(e);
                dispatch(indicationsFailure());
            }
        )
    ;
};

export const indicationsDelete = id => (dispatch, getState) => {

    dispatch(loaderOn());

    const { name } = getIndicationById(getState(), id);

    return fetchJson('/endpoint/admin/indications/del/' + id, {
        method: 'DELETE',
        always: () => dispatch(loaderOff())
    })
        .then(json => {

            dispatch({
                type: INDICATIONS_LIST_REMOVE,
                payload: id
            });

            dispatch(notificationAdd('Indication "' + name + '" deleted'));

        }, e => errorHandler(dispatch)(e))
    ;
};

export const indicationsSuccess = list => ({
    type: INDICATIONS_LIST_SUCCESS,
    payload: list
});

export const indicationsFailure = () => ({
    type: INDICATIONS_LIST_FAILURE
});

