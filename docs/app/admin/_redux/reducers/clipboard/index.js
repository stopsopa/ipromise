
// import { combineReducers } from 'redux';
//
// import list, * as fromList from './list';
//
// export default combineReducers({
//     list,
// });
//
// export const getClipboard = state =>
//     fromList.getClipboard(state.list)
// ;


import {
    CLIPBOARD_SET,
    CLIPBOARD_RESET,
} from '../../actions/types';

import node from 'detect-node';

const def = false;

export const key = 'clipboard';

export default (def => (state = def, action) => {
    switch (action.type) {
        case CLIPBOARD_RESET:

            if ( ! node ) {

                try {

                    localStorage.removeItem(key);
                }
                catch (e) {

                    console.error(`Clipboard ${CLIPBOARD_RESET} reducer exception: `, e);
                }
            }

            return def;
        case CLIPBOARD_SET:

            if ( ! node ) {

                try {

                    localStorage.setItem(key, JSON.stringify(action.payload));
                }
                catch (e) {

                    console.error(`Clipboard ${CLIPBOARD_SET} reducer exception: `, e);
                }
            }

            return action.payload;
        default:
            return state;
    }
})(def);

export const getClipboard = state => {

    let tmp = state;

    if ( ! node ) {

        try {

            tmp = JSON.parse(localStorage.getItem(key));
        }
        catch (e) {

            console.error(`getClipboard exception: `, e);
        }
    }

    return tmp;
};

