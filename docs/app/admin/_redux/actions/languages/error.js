
import {
    LANGUAGES_FORM_ERROR_REQUEST,
    LANGUAGES_FORM_ERROR_SUCCESS,
    LANGUAGES_FORM_ERROR_FAILURE,
} from '../types';

import {
    fetchJson, fetchData
} from 'transport';

export const languagesFormErrorRequest = () => ({
    type: LANGUAGES_FORM_ERROR_REQUEST
});

export const languagesFormErrorSuccess = errors => ({
    type: LANGUAGES_FORM_ERROR_SUCCESS,
    payload: errors || {}
});

export const languagesFormErrorFailure = () => ({
    type: LANGUAGES_FORM_ERROR_FAILURE
});

