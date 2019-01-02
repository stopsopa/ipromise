
import React from 'react';

import Dashboard from './pages/Dashboard';

import PageNotFound from 'roderic/libs/react/PageNotFound';

import Tinymce from '../examples/Tinymce';

// import UserListVisible from './pages/users/UserListVisible';
// import UserEditVisible from './pages/users/UserEditVisible';

const prefix = '/admin';

const routes = [
    {
        path: prefix,
        component: Dashboard,
        exact: true
    },
    {
        path: prefix + '/tinymce',
        component: Tinymce,
        exact: true,
        // nested: require('./components/pages/about/routes').default,
        // trigger: [
        //     ..list of compoenents
        // ]
    },

// Users
//     {
//         path: `${prefix}/users`,
//         component: UserListVisible,
//         exact: true
//     },
//     {
//         path: `${prefix}/users/create`,
//         component: UserEditVisible,
//         exact: true
//     },
//     {
//         path: `${prefix}/users/edit/:id`,
//         component: UserEditVisible,
//         exact: true
//     },

    {
        path: '*',
        component: PageNotFound
    }
];

export default routes;