
import {
    IMAGES_FORM_ERROR_REQUEST,
    IMAGES_FORM_ERROR_SUCCESS,
    IMAGES_FORM_ERROR_FAILURE,
} from '../types';

import {
    fetchJson, fetchData
} from 'transport';

export const imagesFormErrorRequest = () => ({
    type: IMAGES_FORM_ERROR_REQUEST
});

export const imagesFormErrorSuccess = errors => ({
    type: IMAGES_FORM_ERROR_SUCCESS,
    payload: errors || {}
});

export const imagesFormErrorFailure = () => ({
    type: IMAGES_FORM_ERROR_FAILURE
});

