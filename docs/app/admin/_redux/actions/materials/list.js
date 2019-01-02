
import {
    MATERIALS_LIST_REQUEST,
    MATERIALS_LIST_SUCCESS,
    MATERIALS_LIST_FAILURE,
    MATERIALS_LIST_REMOVE,
    MATERIALS_LIST_REORDER,
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
    getMaterialById,
    getMaterialsIdsInOrder,
} from '../../reducers';

export const materialsRequest = () => (dispatch, getState) => {

    dispatch(loaderOn());

    dispatch({
        type: MATERIALS_LIST_REQUEST
    });

    return fetchJson('/endpoint/admin/materials', {
        always: () => dispatch(loaderOff())
    })
        .then(
            json => dispatch(materialsSuccess(json.list)),
            e => {
                errorHandler(dispatch)(e);
                dispatch(materialsFailure());
            }
        )
    ;
};

export const materialsDelete = id => (dispatch, getState) => {

    dispatch(loaderOn());

    const { filename: name } = getMaterialById(getState(), id);

    return fetchJson('/endpoint/admin/materials/del/' + id, {
        method: 'DELETE',
        always: () => dispatch(loaderOff())
    })
        .then(json => {

            dispatch({
                type: MATERIALS_LIST_REMOVE,
                payload: id
            });

            dispatch(notificationAdd('Material "' + name + '" deleted'));

        }, e => {
            errorHandler(dispatch)(e);
            // dispatch(materialsFailure());
        });
    ;
};

export const materialReorder = (oldIndex, newIndex) => (dispatch, getState) => {

    dispatch({
        type: MATERIALS_LIST_REORDER,
        payload: {
            oldIndex,
            newIndex,
        }
    });

    const promise = fetchJson('/endpoint/admin/materials/reorder', {
        method: 'POST',
        body: {
            ids: getMaterialsIdsInOrder(getState())
        }
    });

    promise.catch(() => dispatch({
        type: MATERIALS_LIST_REORDER,
        payload: {
            oldIndex: newIndex,
            newIndex: oldIndex,
        }
    }));

    return promise;
};

export const materialsSuccess = list => ({
    type: MATERIALS_LIST_SUCCESS,
    payload: list
});

export const materialsFailure = () => ({
    type: MATERIALS_LIST_FAILURE
});

