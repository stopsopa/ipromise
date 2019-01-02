
import {
    USERS_FORM_ERROR_REQUEST,
    USERS_FORM_ERROR_SUCCESS,
    USERS_FORM_ERROR_FAILURE,
} from '../types';


export const usersFormErrorRequest = () => ({
    type: USERS_FORM_ERROR_REQUEST
});

export const usersFormErrorSuccess = errors => ({
    type: USERS_FORM_ERROR_SUCCESS,
    payload: errors || {}
});

export const usersFormErrorFailure = () => ({
    type: USERS_FORM_ERROR_FAILURE
});

