
import {
    BUCKETS_FORM_ERROR_REQUEST,
    BUCKETS_FORM_ERROR_SUCCESS,
    BUCKETS_FORM_ERROR_FAILURE,
} from '../types';

import {
    fetchJson, fetchData
} from 'transport';

export const bucketsFormErrorRequest = () => ({
    type: BUCKETS_FORM_ERROR_REQUEST
});

export const bucketsFormErrorSuccess = errors => ({
    type: BUCKETS_FORM_ERROR_SUCCESS,
    payload: errors || {}
});

export const bucketsFormErrorFailure = () => ({
    type: BUCKETS_FORM_ERROR_FAILURE
});

