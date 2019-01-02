/**
 * WARNING
 * WARNING
 * WARNING
 * WARNING
 * WARNING: be carefull with exposing here vulnerable data, because this file is sended to browser
 * WARNING
 * WARNING
 * WARNING
 * WARNING: ... and don't remove this message, please...
 */

//
// /**
//  * I'm readding parameters straight from symfony config, because it is always good idea
//  * to avoid duplications of parameters across project
//  */
// let sf_parameters;
// try {
//     sf_parameters     = require('../react/preprocessor/sf_parameters');
// }
// catch (e) {
//     throw `\n\n\n             Error: Can't load sf_parameters, first run preprocessor\n\n\n     Native error: ${e}\n\n\n`;
// }

const env = (function () {

    const node = typeof global !== 'undefined' && Object.prototype.toString.call(global.process) === '[object process]';

    let cache = false;

    if (node) {
        cache = process.env;
    }
    else {
        cache = require('./preprocessor/dotenv.json');
    }

    return (name, ...rest) => {

        if (!cache[name]) {

            if (rest.length) {

                return rest[0];
            }

            console.log(JSON.stringify(cache, null, 4))

            throw `public.config.js: Environement variable '${name}' doesn't exist`;
        }

        return cache[name];
    }
}());

module.exports = {
    fake: true, // to enable transport-fake.js
    delay: false, //1300
    // delay: 1000, //1300
    jwt: {
        remote: { // all rest is defined in server.config.js
            jwttokendiff    : '/api/jwttokendiff',
            jwttokenrefresh : '/api/jwttokenrefresh',
        },
        secureEndpointsPattern: /^\/admin/,
        postToGetReloadShortcut: true,
        loginHiddenInput: {
            name: '_authenticate',
            value: 'authenticate'
        },

        // WARNING: setup the same value also in php/app/config/parameters.yml -> cookie_name
        cookie_name: env('JWT_COOKIE_NAME'), // use for localstorage and cookies
    },
    htmlParams: {
        // gaid: 'UA-xxxxxxxx-xx'
        gaid: env('GA_TRACKING_ID', false),
    },
    php_proxy: {
        prefix  : /(\/endpoint|\/media)([\/\?].*)?$/,
    },
    // jsonApi: { // fake api jsonFilesCacheMiddleware.js &&
    //     inNodeFetchDirectlyFromFiles: true,
    //     dir: (function () {
    //
    //         const node = typeof global !== 'undefined' && Object.prototype.toString.call(global.process) === '[object process]';
    //
    //         if (node) {
    //
    //             const path = eval('require')('path');
    //
    //             return path.resolve(__dirname, 'data');
    //         }
    //
    //         log('for jsonFilesCacheMiddleware: no data directory for jsonApi');
    //     }()),
    //     timeout: 60 // sec
    // },
}
