
import {
    ACTIVITYWALL_FORM_ERROR_REQUEST,
    ACTIVITYWALL_FORM_ERROR_SUCCESS,
    ACTIVITYWALL_FORM_ERROR_FAILURE,
} from '../types';


export const activitywallFormErrorRequest = () => ({
    type: ACTIVITYWALL_FORM_ERROR_REQUEST
});

export const activitywallFormErrorSuccess = errors => ({
    type: ACTIVITYWALL_FORM_ERROR_SUCCESS,
    payload: errors || {}
});

export const activitywallFormErrorFailure = () => ({
    type: ACTIVITYWALL_FORM_ERROR_FAILURE
});

