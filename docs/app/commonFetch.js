/**
 * Use rather routers.js -> trigger array
 * Use rather routers.js -> trigger array
 * Use rather routers.js -> trigger array
 */


import {
    footerRequest,
    headerRequest,
} from './_redux/actions';

export default (store, routerParams) => Promise.all([
    store.dispatch(footerRequest()),
    store.dispatch(headerRequest()),
]);
