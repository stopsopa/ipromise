
import {
    MATERIALS_FORM_ERROR_REQUEST,
    MATERIALS_FORM_ERROR_SUCCESS,
    MATERIALS_FORM_ERROR_FAILURE,
} from '../types';

import {
    fetchJson, fetchData
} from 'transport';

export const materialsFormErrorRequest = () => ({
    type: MATERIALS_FORM_ERROR_REQUEST
});

export const materialsFormErrorSuccess = errors => ({
    type: MATERIALS_FORM_ERROR_SUCCESS,
    payload: errors || {}
});

export const materialsFormErrorFailure = () => ({
    type: MATERIALS_FORM_ERROR_FAILURE
});

