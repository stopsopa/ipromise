
import {
    TYPES_LIST_REQUEST,
    TYPES_LIST_SUCCESS,
    TYPES_LIST_ADD
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


export const materialTypeRequest = () => (dispatch, getState) => {

    dispatch(loaderOn());

    dispatch({
        type: TYPES_LIST_REQUEST
    });

    return fetchJson('/endpoint/admin/materials/gettypes', {
        always: () => dispatch(loaderOff())
    })
        .then(
            json => dispatch(materialTypeSuccess(json.list)),
            e => {
                errorHandler(dispatch)(e);
                // dispatch(typesFailure());
            }
        )
    ;
};

export const materialTypeSuccess = list => ({
    type: TYPES_LIST_SUCCESS,
    payload: list
});

export const materialTypeAdd = name => ({
    type: TYPES_LIST_ADD,
    payload: name
})


