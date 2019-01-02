
import {
    INDICATIONS_FORM_ERROR_REQUEST,
    INDICATIONS_FORM_ERROR_SUCCESS,
    INDICATIONS_FORM_ERROR_FAILURE,
} from '../types';

import {
    fetchJson, fetchData
} from 'transport';

export const indicationsFormErrorRequest = () => ({
    type: INDICATIONS_FORM_ERROR_REQUEST
});

export const indicationsFormErrorSuccess = errors => ({
    type: INDICATIONS_FORM_ERROR_SUCCESS,
    payload: errors || {}
});

export const indicationsFormErrorFailure = () => ({
    type: INDICATIONS_FORM_ERROR_FAILURE
});

