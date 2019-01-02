
import { combineReducers } from 'redux';

import list, * as fromList from './list';

export default combineReducers({
    list,
});

export const getReferences = state =>
    fromList.getReferences(state.list)
;
