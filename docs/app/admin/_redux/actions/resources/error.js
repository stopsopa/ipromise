
import {
    RESOURCES_FORM_ERROR_REQUEST,
    RESOURCES_FORM_ERROR_SUCCESS,
    RESOURCES_FORM_ERROR_FAILURE,
} from '../types';

import {
    fetchJson, fetchData
} from 'transport';

export const resourcesFormErrorRequest = () => ({
    type: RESOURCES_FORM_ERROR_REQUEST
});

export const resourcesFormErrorSuccess = errors => ({
    type: RESOURCES_FORM_ERROR_SUCCESS,
    payload: errors || {}
});

export const resourcesFormErrorFailure = () => ({
    type: RESOURCES_FORM_ERROR_FAILURE
});

