
import {
    SUPPORTGROUPS_FORM_ERROR_REQUEST,
    SUPPORTGROUPS_FORM_ERROR_SUCCESS,
    SUPPORTGROUPS_FORM_ERROR_FAILURE,
} from '../types';

import {
    fetchJson, fetchData
} from 'transport';

export const supportGroupsFormErrorRequest = () => ({
    type: SUPPORTGROUPS_FORM_ERROR_REQUEST
});

export const supportGroupsFormErrorSuccess = errors => ({
    type: SUPPORTGROUPS_FORM_ERROR_SUCCESS,
    payload: errors || {}
});

export const supportGroupsFormErrorFailure = () => ({
    type: SUPPORTGROUPS_FORM_ERROR_FAILURE
});

