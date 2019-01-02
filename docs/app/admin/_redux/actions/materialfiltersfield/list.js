
import {
    MATERIAL_FILTERS_LIST_REQUEST,
    MATERIAL_FILTERS_LIST_SUCCESS,
    MATERIAL_FILTERS_LIST_ADD
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


export const materialFiltersRequest = () => (dispatch, getState) => {

    dispatch(loaderOn());

    dispatch({
        type: MATERIAL_FILTERS_LIST_REQUEST
    });

    return fetchJson('/endpoint/admin/materials/getfilters', {
        always: () => dispatch(loaderOff())
    })
        .then(
            json => dispatch(materialFiltersSuccess(json.list)),
            e => {
                errorHandler(dispatch)(e);
                // dispatch(filtersFailure());
            }
        )
    ;
};

export const materialFiltersSuccess = list => ({
    type: MATERIAL_FILTERS_LIST_SUCCESS,
    payload: list
});

export const materialFiltersAdd = name => ({
    type: MATERIAL_FILTERS_LIST_ADD,
    payload: name
})


