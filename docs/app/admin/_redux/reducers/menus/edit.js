
import {
    MENUS_EDIT_REQUEST,
    MENUS_EDIT_SUCCESS,
    MENUS_EDIT_FAILURE,
    MENUS_EDIT_DELETE,
    MENUS_EDIT_ADD,
    MENUS_EDIT_SAVE,
    MENUS_EDIT_FIELD, MENUS_LIST_SUCCESS,
} from '../../actions/types';

import isArray from 'lodash/isArray';

const remove = (parentArray, offset, treeIndex, level) => {

    (typeof level === 'undefined') && (level = 0);

    let i = 0, found = false, inOffset, l = parentArray.length;

    // log(`${level} offset:`, offset, `before, i: ` , i , ' pale: ', parentArray.length)

    let lOffset = 0;

    for (; i < l ; i += 1 ) {

        // log(`${level} lOffset + offset: `, lOffset + offset, 'title:', parentArray[i].title)

        if ( lOffset + offset === treeIndex) {

            // log(`${level} equal parents`, parentArray, 'childIndex', i, 'child', parentArray[i]);

            found = true;

            break;
        }

        lOffset += 1;

        if (isArray(parentArray[i].children) && parentArray[i].children.length > 0) {

            const {
                result,
                stop,
                lOffset: f
            } = remove(parentArray[i].children, offset + lOffset, treeIndex, level + 1);

            lOffset += f;

            parentArray[i].children = result;

            if (stop) {

                break;
            }
        }
    }

    if (found) {

        // log(`${level} found`, i, 'before: ', parentArray.length)

        parentArray.splice(i, 1);

        // log('after: ', parentArray.length)
        return {
            result: [...parentArray],
            stop: true
        };
    }
    else {

        // log('not found')

        return {
            result: parentArray,
            lOffset,
            stop: false
        };
    }
}

export default ((def) => (state = def, action) => {
    let copy;
    switch (action.type) {
        case MENUS_EDIT_ADD:
            {
                const {
                    lang,
                    pid,
                    title
                } = action.payload;

                copy = {...state};

                if (typeof pid !== 'number') {

                    throw `reducer: menus/edit, action MENUS_EDIT_ADD, pid is not a number: ` + JSON.stringify(pid);
                }

                if ( ! lang ) {

                    throw `reducer: menus/edit, action MENUS_EDIT_ADD, lang parameter not specified: ` + JSON.stringify(lang);
                }

                if ( ! title ) {

                    throw `reducer: menus/edit, action MENUS_EDIT_ADD, title is false: ` + JSON.stringify(title);
                }

                copy[lang].unshift({
                    pid,
                    title
                });

                copy[lang] = [...copy[lang]];

                return copy;
            }
            break;
        case MENUS_EDIT_DELETE:

            {
                const {
                    lang,
                    treeIndex
                } = action.payload;

                if (typeof treeIndex !== 'number') {

                    throw `reducer: menus/edit, action MENUS_EDIT_DELETE, treeIndex is not a number: ` + JSON.stringify(treeIndex);
                }

                if ( ! lang ) {

                    throw `reducer: menus/edit, action MENUS_EDIT_DELETE, lang parameter not specified: ` + JSON.stringify(lang);
                }

                // log('MENUS_EDIT_DELETE', treeIndex);

                copy = {...state};

                // log('all before', JSON.stringify(copy[lang], null, 4))
                //
                // log('remove lang:', lang, 'copy[lang]', copy[lang], 'treeIndex', treeIndex);

                const {
                    result,
                    stop
                } = remove(copy[lang], 0, treeIndex);

                // log('all after', JSON.stringify(result, null, 4))

                copy[lang] = [...result];

                // return state;

                return copy;
            }
        case MENUS_EDIT_FIELD:

            {

                let { lang, value } = action.payload;

                if ( ! lang ) {

                    throw `reducer: menus/edit, action MENUS_EDIT_FIELD, lang parameter not specified: ` + JSON.stringify(lang);
                }

                copy = {...state};

                copy[lang] = value;

                return copy;
            }
        case MENUS_EDIT_REQUEST:
            return def;
        case MENUS_EDIT_SUCCESS:
            return action.payload;
        // case MENUS_EDIT_FAILURE:
        //     return action.payload;
        // case MENUS_EDIT_SAVE:
        //     return action.payload;
        default:
            return state;
    }
})(false); // might be also (and usually is) array

export const getMenusEdit = state => state;
