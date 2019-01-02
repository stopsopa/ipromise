import React from "react";

// import PageNotFound from "../admin/pages/PageNotFound";

// import PageNotFound from "../pages/PageNotFound";

import Page from '../pages/Page';

import Puppeteer from '../pages/Puppeteer';

const routes = [
   
    // {
    //     path: "/about-us",
    //     exact: true,
    //     name: "About Us",
    //     component: Guide
    // },
    // {
    //     name: "Information & Support",
    //     path: "/info-and-support",
    //     component: Guide,
    //     routes: [
    //         { name: "Patients & Carers", path: "/info-and-support/pts-and-carers", component: Homepage }
    //     ]
    // },
    {
        path: "/puppeteer",
        exact: true,
        component: Puppeteer
    },
    {
        path: "/:slug(.*)?",
        exact: false,
        component: Page
    },
    // It is used directly in Root.js
    // {
    //   path: "*",
    //   exact: false,
    //   component: PageNotFound
    // }
];

export default routes;
