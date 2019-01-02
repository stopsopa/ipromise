
import React from 'react';

// import SSRRedirect from 'roderic/libs/react/SSRRedirect';

// import PageNotFound from 'roderic/libs/react/PageNotFound';

// import LangMainComponent from './components/LangMainComponent';

// import Footer from './components/parts/Footer';

// import Homepage from './pages/home/HomePageContainer';

// import Other from './pages/other/Other';

import Ipromise from './pages/ipromise/Ipromise';

const prefix = '';

const routes = {
    nested: [
        // {
        //     path: "/:lang([a-z]{2})",
        //     exact: false,
        //     component: LangMainComponent,
        //     nested: require('./components/routes').default,
        // },
        // // {
        // //     path: '/', // must be / not empty string
        // //     exact: true,
        // //     component: () => <SSRRedirect to={prefix + '/en'} />
        // // },
        // {
        //     path: "*",
        //     exact: false,
        //     component: PageNotFound
        // }
        {
            path: "*",
            exact: false,
            component: Ipromise
        }
    ],
    trigger: [
        // Footer,
    ],
    meta: `<title>...</title>`
};

export default routes;