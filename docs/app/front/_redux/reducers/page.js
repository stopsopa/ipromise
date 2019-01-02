
import {
    PAGE_REQUEST,
    PAGE_SUCCESS,
    PAGE_FAILURE,
} from '../actions/types';

import { combineReducers } from 'redux';

const pageDef = false;

const page = (state = pageDef, action) => {
    switch (action.type) {
        case PAGE_REQUEST:
            return pageDef;
        case PAGE_SUCCESS:
            return action.payload.page;
        default:
            return state;
    }
};

const slugDef = false;

const slug = (state = slugDef, action) => {
    switch (action.type) {
        case PAGE_REQUEST:
            return slugDef;
        case PAGE_SUCCESS:
            return action.payload.slug || '/';
        default:
            return state;
    }
};

export default combineReducers({
    page,
    slug,
})

export const getPage = state => state.page;

export const getSlug = state => state.slug;
