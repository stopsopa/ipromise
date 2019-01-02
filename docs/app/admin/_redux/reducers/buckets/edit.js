
import {
    BUCKETS_EDIT_REQUEST,
    BUCKETS_EDIT_SUCCESS,
    BUCKETS_EDIT_FAILURE,
    BUCKETS_EDIT_SAVE,
    BUCKETS_EDIT_FIELD,
    IMAGES_LIST_REMOVE
} from '../../actions/types';

import isArray from 'lodash/isArray';

export default ((def) => (state = def, action) => {
    switch (action.type) {
        case BUCKETS_EDIT_FIELD:
            return { ...state, [action.payload.key]: action.payload.value }
        case BUCKETS_EDIT_REQUEST:
            return def;
        case BUCKETS_EDIT_SUCCESS:
            return action.payload;
        case IMAGES_LIST_REMOVE:
            if ((state.thumbnails && isArray(state.thumbnails)) ||
                (state.banners && isArray(state.banners))) {

                var indexThumbnail = state.thumbnails.indexOf(action.payload);
                var indexBanner = state.banners.indexOf(action.payload);

                if ((indexThumbnail > -1) || (indexBanner > -1)) {

                    state.thumbnails.splice(indexThumbnail, 1);
                    state.banners.splice(indexBanner, 1);

                    return {...state};
                }
            }
        // case BUCKETS_EDIT_FAILURE:
        //     return action.payload;
        // case BUCKETS_EDIT_SAVE:
        //     return action.payload;
        default:
            return state;
    }
})(false);

export const getBucketsEdit = state => state;
