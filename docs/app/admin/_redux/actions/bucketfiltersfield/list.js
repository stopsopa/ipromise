
import {
    BUCKET_FILTERS_LIST_REQUEST,
    BUCKET_FILTERS_LIST_SUCCESS,
    BUCKET_FILTERS_LIST_ADD
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


export const bucketFiltersRequest = () => (dispatch, getState) => {

    dispatch(loaderOn());

    dispatch({
        type: BUCKET_FILTERS_LIST_REQUEST
    });

    return fetchJson('/endpoint/admin/buckets/getfilters', {
        always: () => dispatch(loaderOff())
    })
        .then(
            json => dispatch(bucketFiltersSuccess(json.list)),
            e => {
                errorHandler(dispatch)(e);
                // dispatch(filtersFailure());
            }
        )
    ;
};

export const bucketFiltersSuccess = list => ({
    type: BUCKET_FILTERS_LIST_SUCCESS,
    payload: list
});

export const bucketFiltersAdd = name => ({
    type: BUCKET_FILTERS_LIST_ADD,
    payload: name
})


