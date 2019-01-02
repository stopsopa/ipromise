
import {
    LOADER_ON,
    LOADER_OFF,
    LOADER_ERROR,
    LOADER_MESSAGE,
    LOADER_BUTTONS_SHOW,
    LOADER_BUTTONS_HIDE
} from './types';

export const loaderButtonsShow = () => ({type:LOADER_BUTTONS_SHOW});

export const loaderButtonsHide = () => ({type:LOADER_BUTTONS_HIDE});

export const loaderOn = () => ({
    type: LOADER_ON
});

export const loaderOff = (delay = 0) => (dispatch, getState) => setTimeout(() => dispatch({
    type: LOADER_OFF
}), delay);

const definition = function (type) {

    let handler = null;

    return (msg, time, delay = 100) => (dispatch, getState) => setTimeout(() => {

        dispatch({
            type,
            msg
        });

        clearTimeout(handler);

        handler = setTimeout(() => {

            dispatch(loaderOff());

        }, time || 50000);
    }, delay);
};
export const loaderError    = definition(LOADER_ERROR);

export const loaderMessage  = definition(LOADER_MESSAGE);