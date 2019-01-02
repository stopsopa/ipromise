
import {
    HASHES_FORM_ERROR_REQUEST,
    HASHES_FORM_ERROR_SUCCESS,
    HASHES_FORM_ERROR_FAILURE,
} from '../types';


export const hashesFormErrorRequest = () => ({
    type: HASHES_FORM_ERROR_REQUEST
});

export const hashesFormErrorSuccess = errors => ({
    type: HASHES_FORM_ERROR_SUCCESS,
    payload: errors || {}
});

export const hashesFormErrorFailure = () => ({
    type: HASHES_FORM_ERROR_FAILURE
});

