
import {
    SUBCATEGORIES_FORM_ERROR_REQUEST,
    SUBCATEGORIES_FORM_ERROR_SUCCESS,
    SUBCATEGORIES_FORM_ERROR_FAILURE,
} from '../types';

import {
    fetchJson, fetchData
} from 'transport';

export const subcategoriesFormErrorRequest = () => ({
    type: SUBCATEGORIES_FORM_ERROR_REQUEST
});

export const subcategoriesFormErrorSuccess = errors => ({
    type: SUBCATEGORIES_FORM_ERROR_SUCCESS,
    payload: errors || {}
});

export const subcategoriesFormErrorFailure = () => ({
    type: SUBCATEGORIES_FORM_ERROR_FAILURE
});

