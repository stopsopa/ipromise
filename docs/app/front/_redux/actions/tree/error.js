
import {
    CATEGORIES_FORM_ERROR_REQUEST,
    CATEGORIES_FORM_ERROR_SUCCESS,
    CATEGORIES_FORM_ERROR_FAILURE,
} from '../types';


export const categoriesFormErrorRequest = () => ({
    type: CATEGORIES_FORM_ERROR_REQUEST
});

export const categoriesFormErrorSuccess = errors => ({
    type: CATEGORIES_FORM_ERROR_SUCCESS,
    payload: errors || {}
});

export const categoriesFormErrorFailure = () => ({
    type: CATEGORIES_FORM_ERROR_FAILURE
});

