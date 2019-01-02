
import {
    PAGE_REQUEST,
    PAGE_SUCCESS,
    PAGE_FAILURE,
} from './types';

import {
    fetchJson
} from 'transport';

// import errorHandler from "../../../admin/_redux/actions/errorHandler";

// import selenium from 'selenium';
// import {PAGES_LIST_REQUEST} from "../../../admin/_redux/actions/types";

export const pageRequest = (lang, slug = '') => (dispatch, getState) => {

    // if ( ! section ) {
    //
    //     throw `pageRequest: 'section' parameter is empty`;
    // }

    // const page = json.page;

    // if ( ! page ) { // if page given this means it's load more mode

        dispatch(pagesReset());
    // }

    // const country = json.country;
    //
    // const language = json.language;

    // const promise = fetchJson(`/endpoint/api/${lang}/${slug}`, {
    const promise = fetchJson(`/endpoint/page?lang=${lang}&slug=${slug}`, {
        method: 'post',
        // body: json
    });

    return promise
        .then(json => {

            if ( ! json || ! json.page ) {

                return Promise.reject();
            }

            return json;
        })
        .then(
            json => {

                // selenium.dispatch(`pageRequest:${section}`, {
                //     supportSelectedCountry: country,
                //     materialsSelectedLanguage: language
                // });

                // if (page) {
                //
                //     const extracted = extract ? extract(json) : json;
                //
                //     const ret = dispatch(
                //         pageSuccessAppend(
                //             section,
                //             extracted
                //         )
                //     );
                //
                //     selenium.dispatch(`pageRequest:pageSuccessAppend:${section}`, {
                //         page,
                //         list: extracted.map(e => e.id)
                //     });
                //
                //     return ret;
                // }

                return dispatch(
                    pageSuccess(
                        slug,
                        json.page,
                    )
                );
            },
            e => {
                log('error', e)
                // errorHandler(dispatch)(e);
                // dispatch(pageFailure());
            }
        )
    ;
};

export const pagesReset = () => ({
    type: PAGE_REQUEST
});

export const pageSuccess = (slug, page) => (dispatch, getState) => {

    // if ( ! section ) {
    //
    //     throw `pageSuccess: 'section' parameter is empty`;
    // }

    // selenium.dispatch(`pageSuccess:${section}`, {
    //     len: section.length,
    //     section
    // });

    dispatch({
        type: PAGE_SUCCESS,
        payload: {
            slug,
            page
        }
    });

    return page;
};