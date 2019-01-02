
import { combineReducers } from 'redux';

/* imports */

// import tree, * as fromTree from './tree';

import page, * as fromPage from './page';

import main, * as fromMain from './main';

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

const node = typeof global !== 'undefined' && Object.prototype.toString.call(global.process) === '[object process]';

/* imports */

const reducers = {
    /* combine */
    page,
    // tree,
    main,
    /* combine */
};

if ( ! node ) {

    reducers.router = routerReducer;
}

export default combineReducers(reducers);


/* selectors */

export const getMain = state =>
    fromMain.getMain(state.main)
;

export const getMainSection = (state, section) =>
    fromMain.getMainSection(state.main, section)
;

export const getPage = state =>
    fromPage.getPage(state.page)
;

export const getSlug = state =>
    fromPage.getSlug(state.page)
;

// TREE
// export const getUsers = state =>
//     fromTree.getUsers(state.users)
// ;


/* selectors */


