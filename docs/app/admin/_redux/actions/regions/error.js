
import {
    REGIONS_FORM_ERROR_REQUEST,
    REGIONS_FORM_ERROR_SUCCESS,
    REGIONS_FORM_ERROR_FAILURE,
} from '../types';

import {
    fetchJson, fetchData
} from 'transport';

export const regionsFormErrorRequest = () => ({
    type: REGIONS_FORM_ERROR_REQUEST
});

export const regionsFormErrorSuccess = errors => ({
    type: REGIONS_FORM_ERROR_SUCCESS,
    payload: errors || {}
});

export const regionsFormErrorFailure = () => ({
    type: REGIONS_FORM_ERROR_FAILURE
});

