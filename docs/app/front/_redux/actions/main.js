
import {
    MAIN_REQUEST,
    MAIN_SUCCESS,
    MAIN_FAILURE,
    MAIN_SUCCESS_APPEND,
} from './types';

import {
    fetchJson
} from 'transport';

// import errorHandler from "../../../admin/_redux/actions/errorHandler";

// import selenium from 'selenium';

// export const mainRequest = (params) => async (dispatch, getState) => {

export const mainRequest = ({
    section,
    url,
    json = {},
    extract
}) => async (dispatch, getState) => {

    // const {
    //     section,
    //     url,
    //     json = {},
    //     extract,
    // } = params;

    // return log('params', params);

    if ( ! section ) {

        throw `mainRequest: 'section' parameter is empty`;
    }

    const page = json.page;

    if ( ! page ) { // if page given this means it's load more mode

        dispatch({
            type: MAIN_REQUEST,
            payload: section
        });
    }

    // const country = json.country;
    //
    // const language = json.language;

    const promise = fetchJson(url || `/api/json/${section}`, {
        method: 'post',
        body: json
    });

    // return promise
    //     .then(
    //         json => {
    //
    //             // selenium.dispatch(`mainRequest:${section}`, {
    //             //     supportSelectedCountry: country,
    //             //     materialsSelectedLanguage: language
    //             // });
    //
    //             if (page) {
    //
    //                 const extracted = extract ? extract(json) : json;
    //
    //                 const ret = dispatch(
    //                     mainSuccessAppend(
    //                         section,
    //                         extracted
    //                     )
    //                 );
    //
    //                 // selenium.dispatch(`mainRequest:mainSuccessAppend:${section}`, {
    //                 //     page,
    //                 //     list: extracted.map(e => e.id)
    //                 // });
    //
    //                 return ret;
    //             }
    //
    //             return dispatch(
    //                 mainSuccess(
    //                     section,
    //                     extract ? extract(json) : json
    //                 )
    //             );
    //         },
    //         e => {
    //             // errorHandler(dispatch)(e);
    //             dispatch(mainFailure());
    //         }
    //     )
    // ;

    const retJson = await promise;



    // selenium.dispatch(`mainRequest:${section}`, {
    //     supportSelectedCountry: country,
    //     materialsSelectedLanguage: language
    // });

    const extracted = extract ? extract(retJson) : retJson;

    if (page) {

        const ret = dispatch(
            mainSuccessAppend(
                section,
                extracted
            )
        );

        // selenium.dispatch(`mainRequest:mainSuccessAppend:${section}`, {
        //     page,
        //     list: extracted.map(e => e.id)
        // });

        return ret;
    }

    return dispatch(
        mainSuccess(
            section,
            extracted
        )
    );
};

export const mainSuccess = (section, content) => (dispatch, getState) => {

    if ( ! section ) {

        throw `mainSuccess: 'section' parameter is empty`;
    }

    // selenium.dispatch(`mainSuccess:${section}`, {
    //     len: section.length,
    //     section
    // });

    const payload = {
        section,
        content
    };

    dispatch({
        type: MAIN_SUCCESS,
        payload,
    });

    return payload;
};

export const mainSuccessAppend = (section, content) => (dispatch, getState) => {

    if ( ! section ) {

        throw `mainSuccessAppend: 'section' parameter is empty`;
    }

    dispatch({
        type: MAIN_SUCCESS_APPEND,
        payload: {
            section,
            content
        }
    });

    return content.length;
};
