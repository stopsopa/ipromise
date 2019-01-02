'use strict';

// to remove error: [ReferenceError]: >ReferenceError: regeneratorRuntime is not defined
// https://babeljs.io/docs/en/babel-polyfill
// https://github.com/babel/babel/issues/5085#issuecomment-277544677
import "@babel/polyfill";

require('@stopsopa/dotenv-up')(3, true, 'index.server');

import path from 'path';

import React from 'react';

import serialize from 'serialize-javascript';

import express, { Router } from 'express';

import md5 from 'md5';

import jwt from 'jsonwebtoken';

import compression from 'compression';

import bodyParser from 'body-parser';

import configWebpack from '../react/config';

import configPublic from 'public.config';

import configServer from 'server.config';

const jwt_secret_md5 = md5(configServer.jwt.jwt_secret);

import html from 'html';

import configureStore, { fetchData, cascadeMeta } from 'roderic/libs/configureStore';

import 'colors';

import { renderToString } from 'react-dom/server';

import sourceMapSupport from "source-map-support";

import template from 'lodash/template';

// import { ServerStyleSheet } from 'styled-components'

import proxy from 'http-proxy-middleware';

import replace from 'roderic/webpack/htmlcache';

import jwtCookie from 'roderic/libs/jwtCookie';

import { fetchJson, fetchData as fetchDataTransport } from "transport";

import tlog from 'inspc/logt';

const dotenv = require('roderic/webpack/dotenv');
dotenv.webload(require('preprocessor/dotenv.json'));
const isProd = dotenv.isProd();

if ( ! isProd ) {

    sourceMapSupport.install();
}

const host      = configWebpack.server.host;
const port      = configWebpack.server.port;

process.on('uncaughtException', function (e) {
    switch (true) {
        case (e.code === 'EADDRINUSE' && e.errno === 'EADDRINUSE'):
            process.stdout.write(`\naddress ${host}:${port} already in use - server killed\n\n`.red);
            break;
        case (e.code === 'EACCES' && e.errno === 'EACCES'):
            process.stdout.write(`\nno access to take ${host}:${port} address - server killed - (use sudo)\n\n`.red);
            break;
        default:
            throw e;
    }
});

const app = express();

app.use(require('roderic/libs/express-extend-res'));

const requestIp = require('request-ip');

app.use(requestIp.mw())

const server    = require('http').createServer(app);

const io        = require('socket.io')(server); // io

(function () { // polyfill
    const polyfills = require('polyfill-service-express')({
        verbose: true, // https://github.com/fooloomanzoo/polyfill-service-express/blob/master/lib/index.js#L21
    });

    let list = 'not yet';

    require('polyfill-service').listAllPolyfills().then(tmp => list = tmp); // https://github.com/Financial-Times/polyfill-service#listallpolyfills-method

    app.all('/polyfill.list', (req, res) => res.end(JSON.stringify(list)));

    /**
     * https://github.com/fooloomanzoo/polyfill-service-express/blob/master/lib/index.js#L21
     *
     * to test:
     * ie11:
     *  /polyfill.min.js?features=fetch&ua=Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko
     *  /polyfill.js?features=fetch&ua=Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko
     */
    app.get(/^\/polyfill(\.\w+)(\.\w+)?/, polyfills); // polyfill.min.js?params...

}());

// (function () {
//     var auth = require('basic-auth');
//     app.use((req, res, next) => {
//         var credentials = auth(req);
//         if (!credentials || credentials.name !== 'john' || credentials.pass !== 'secret') {
//             res.statusCode = 401;
//             res.setHeader('WWW-Authenticate', 'Basic realm="example"')
//             res.end('Access denied')
//         } else {
//             next();
//         }
//     });
// }());

app.all('/infinity', () => {});

app.use(compression({filter: (req, res) => {
    if (req.headers['x-no-compression']) {
        // don't compress responses with this request header
        return false
    }

    // fallback to standard filter function
    return compression.filter(req, res)
}}));

app.use(express.static(configWebpack.web, { // http://expressjs.com/en/resources/middleware/serve-static.html
    // maxAge: 60 * 60 * 24 * 1000 // in milliseconds
    maxAge: '356 days', // in milliseconds max-age=30758400
    setHeaders: (res, path) => {

        if (/\.bmp$/i.test(path)) { // for some reason by default express.static sets here Content-Type: image/x-ms-bmp

            res.setHeader('Content-type', 'image/bmp')
        }

        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control
        // res.setHeader('Cache-Control', 'public, no-cache, max-age=30758400')
        // res.setHeader('Cache-Control', 'public, only-if-cached')
    }
}));

if (configServer.redirections) {

    app.use(require('roderic/libs/redirectionsMiddleware')(configServer.redirections));
}

/**
 * Reutrn session time left - calculated on server for better reliability
 * In this case only if we don't use remote api server
 */
configServer.jwt.remote || (function () {

    const jwtExtractPayload = require('roderic/libs/jwtExtractPayload');

    app.all(/^\/endpoint(\/app_dev\.php)?\/jwttokendiff/, (req, res) => {

        const cookie = jwtCookie(req, res);

        const cookieJWTTwoDotsToken = cookie.get();

        let error = false;

        try {

            const payload = jwtExtractPayload(cookieJWTTwoDotsToken);

            const diff = parseInt(payload.exp - ((new Date()).getTime() / 1000), 10);

            // const diff = 60 * 60 * 24 * 2;

            if (Number.isInteger(diff)) {

                res.setHeader('Content-type', 'application/json; charset=utf-8');

                return res.end(JSON.stringify({
                    diffInSec: diff
                }));
            }
            else {

                error = `Calculated diff is not a number`;
            }
        }
        catch (e) {

            error = `Can't extract payload from jwt token`;
        }

        res.status(500);
        res.end(error || 'Unknown error');
    });
}());

(function (c) {

    if (!c) {

        return;
    }

    const media = require('./front/media.json');

    if (c.prefix && c.schema && c.host && c.port) {

        // tlog('php_proxy mounting', JSON.stringify(Object.assign({}, c, {
        //     prefix: c.prefix.toString(),
        //     joinend: [c.schema,'://',c.host,':',c.port].join('')
        // }), null, 4));

        app.use(
            c.prefix,
            proxy(
                [c.schema,'://',c.host,':',c.port].join(''),
                {
                    changeOrigin: true,
                    pathRewrite: (path) => {

                        const match = path.match(c.prefix);

                        let url = match[2];

                        if (match[1] === '/media') {

                            url = '/media' + (url.split('?')[0]);

                            const parts = url.match(/^.*\[(.+)\]\.([a-z]{3})$/);

                            if ( ! parts ) {

                                throw `Filename should look like this: /media/images/fe/be/example-file[flag].jpg`;
                            }

                            if ( ! media[parts[1]] ) {

                                throw `Node: Flag '${parts[1]}' is not registered, allowed flags: ` + (Object.keys(media).join(', '));
                            }
                        }

                        tlog("proxy_pass:", url);

                        return url;
                    }
                }
            )
        );

    }
    else {
        throw "configServer schema, prefix, host or port is wrong/missing " + JSON.stringify(c, null, 4);
    }

}(configServer.php_proxy && Object.assign(configServer.php_proxy, configPublic.php_proxy)));

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

/**
 * Telegram middleware
 */
// (function () {
//
//     app.all('/broadcast', require('./front/socketSync')({
//         io // io
//     }));
//
// }());

// fake api vvv
configPublic.jsonApi && (function () {

    const jsonFilesCacheMiddleware = require('roderic/libs/jsonFilesCacheMiddleware');

    app.post(
        jsonFilesCacheMiddleware.regex,
        jsonFilesCacheMiddleware(configPublic.jsonApi)
    );
}());
// fake api ^^^

// JWT auth
const twoDotsFormEncodedJWTTokenTransportKey = `Authorization`;
app.use((req, res, next) => {

    try {
        if ( // if request from login form
            req.body[configPublic.jwt.loginHiddenInput.name]
            === configPublic.jwt.loginHiddenInput.value
        ) {

            // // don't show 'Unrecognized username or password'
            res[twoDotsFormEncodedJWTTokenTransportKey] = '';

            // if remote auth mode
            if (configServer.jwt.remote) {

                if ( ! req.body.username) {

                    throw `field req.body.username not specified in request`;
                }

                fetchJson(configServer.jwt.remote.userProviderEndpoint, {
                    method: 'post',
                    body: {
                        username    : req.body.username,
                        password    : req.body.password,
                        role        : req.body.role,
                        jwt_secret  : jwt_secret_md5
                    }
                })
                    .then(json => {

                        tlog('found user: ' + JSON.stringify(json.user));

                        if (json.error) {

                            return Promise.reject(json.error);
                        }

                        if ( ! json.user ) {

                            return Promise.reject(`User not found by username '${req.body.username}'`);
                        }

                        if ( ! json.user.email ) {

                            return Promise.reject(`User don't seem to have 'email' field`);
                        }

                        const url  = configServer.jwt.remote.jwtTokenProvider;

                        const data = {
                            method: 'post',
                            headers: {
                                Accept: 'application/json',
                                'Content-type' : 'application/json; charset=utf-8'
                            },
                            body: JSON.stringify({
                                payload: {
                                    username: json.user.email,
                                    roles: json.user.roles
                                },
                                jwt_secret  : jwt_secret_md5
                            })
                        };

                        const ret = fetchDataTransport(url, data);

                        // log("\nuser\n", url);
                        // log.dump(json);
                        // log(JSON.stringify(data, null, 4));

                        // ret.then(res => res.text()).then(a => log.dump(a), a => log('false', a));

                        return ret;
                    })
                    .then(fetchRes => {

                        const cookie = fetchRes.headers.get('Set-Cookie');

                        cookie && res.set('set-cookie', cookie);

                        const ret = fetchRes.json();

                        // ret.then(a => log.dump(a), () => log('false'));

                        return ret;
                    })
                    .then(json => {

                        if (json.jwt) {

                            // experimental
                            // jwtCookie(req, res).set(json.jwt, false, req.body.browsertime);
                            // jwtCookie(req, res).set(json.jwt);

                            if (configPublic.jwt.postToGetReloadShortcut) {

                                if ((req.get('accept') || '').toLowerCase().split(',').indexOf('text/html') > -1) {

                                    res.set('Content-Type', 'text/html');

                                    return res.end(`<script>location.href = location.href</script>`);
                                }
                            }

                            res[twoDotsFormEncodedJWTTokenTransportKey] = json.jwt;

                            next();

                            return true;
                        }

                        return Promise.reject(`No JWT token returned from provider ` + (json ? JSON.stringify(json, null, 4) : ''));
                    })
                    .catch(data => {

                        if (data.res) { // if response from fetchJson

                            tlog(`JWT auth remote error ( token provider ):`, JSON.stringify(data, null, '    '))
                        }
                        else { // error from first level

                            tlog(`JWT auth remote error ( user provider ) : '${data}'`)
                        }

                        // invalid credentials, in other words: login failed
                        res[twoDotsFormEncodedJWTTokenTransportKey] = false;

                        return next();
                    })
                ;
            }
            else {

                const user = configServer.jwt.users.find(user => (
                    (user.username === req.body.username)
                    &&
                    (user.password === req.body.password)
                ));

                if (user) {

                    tlog('found user (config): ' + JSON.stringify(user));

                    const payload = { // directly for loginSuccessWithJWTStringToken redux action
                        username: user.username,
                        roles: user.roles,
                        // roles and other most important informations about user
                    };

                    const twoDotsJWTToken = jwt.sign(
                        payload,
                        configServer.jwt.jwt_secret,
                        {
                            // https://github.com/auth0/node-jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback
                            // must be int
                            expiresIn: parseInt(configServer.jwt.jwt_expire, 10)
                        }
                    );

                    jwtCookie(req, res).set(twoDotsJWTToken);

                    if (configPublic.jwt.postToGetReloadShortcut) {

                        if ((req.get('accept') || '').toLowerCase().split(',').indexOf('text/html') > -1) {

                            res.set('Content-Type', 'text/html');

                            return res.end(`<script>location.href = location.href</script>`);
                        }
                    }

                    // res.setHeader(twoDotsFormEncodedJWTTokenTransportKey, `Bearer ${token}`);

                    // building __JWT_TOKEN__
                    // to hydrate loginSuccessWithJWTStringToken redux action
                    res[twoDotsFormEncodedJWTTokenTransportKey] = twoDotsJWTToken;
                }
                else {

                    // invalid credentials, in other words: login failed
                    res[twoDotsFormEncodedJWTTokenTransportKey] = false;
                }

                next();
            }

        }
        else {

            next();
        }
    }
    catch (e) {

        tlog('JWT login catch error', e);

        next();
    }

    // res.set('X-test', 'testvaluse');
    //
    // console.log('baseUrl', req.baseUrl);
    // console.log('url', req.url);
    // console.log('originalUrl', req.originalUrl);
}); // JWT auth

/**
 * Method to test if request has valid JWT token
 */
function secured(req, res) {

    // Usage:
    //
    // const twoDotsJWTToken = secured(req, res);
    //
    // if (typeof twoDotsJWTToken === 'string') {
    //
    //     store.dispatch(loginSuccessWithJWTStringToken(twoDotsJWTToken));
    //     // log('dispatch(login) is not triggered (postToGetReloadShortcut disabled mode)')
    // }
    // else {
    //
    //     res.status(401);
    //
    //     return res.end("Unauthorized request");
    // }

    // if postToGetReloadShortcut is disabled then handle auth in one request
    if (res[twoDotsFormEncodedJWTTokenTransportKey] !== undefined) {

        // token provided from previous middleware is always valid - take without checking
        return res[twoDotsFormEncodedJWTTokenTransportKey];
    }

    // fetch normally from cookie (if valid)

    const cookie = jwtCookie(req, res);

    const cookieJWTTwoDotsToken = cookie.get();

    if ( ! cookieJWTTwoDotsToken) {

        tlog("JWT token not found in cookies");

        return ''; // unauthorised but don't show error message
    }

    try {

        // expecting exception from method .verify() if not valid:
        // https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
        jwt.verify(cookieJWTTwoDotsToken, configServer.jwt.jwt_secret);

        // token is valid, prepare to return...
        return cookieJWTTwoDotsToken;
    }
    catch (e) { // auth based on cookie failed (any reason)

        cookie.del(); // i don't want to see this token again

        return ''; // unauthorised but don't show error message

        // usually you should do next what is below, but it's up to you:
        //
        // res.status(401);
        //
        // return res.end("Unauthorized request");
    }
};

// JWT auth

configServer.controllers && app.use(require('./controllers').default());

(function () {

    const extractRoutesMiddleware = require('roderic/libs/extractRoutesMiddleware');

    app.use('/routes', extractRoutesMiddleware({
        app,
        secure: (req, res) => {

            if (req.body.jwt_secret_md5 === jwt_secret_md5) {

                return true;
            }

            return false;
        }
    }));
}());


configServer.knex && (function () {

    const knex              = require('@stopsopa/knex-abstract');

    knex.init(configServer.knex);
}());

if (configServer.checkAcceptHeader) {

    app.use(require('roderic/libs/checkAcceptHeaderMiddleware'));
}

// admin vvv
// (function () {
//
//     const { default: RootServer } = require('./admin/components/RootServer');
//
//     const { default: routes } = require('./admin/routes');
//
//     const { loginSuccessWithJWTStringToken } = require('./admin/_redux/actions');
//
//     const reducers = require('./admin/_redux/reducers').default;
//
//     const htmlLazyLoaderTemplate = require('roderic/libs/fileLazyLoader')(path.resolve(configWebpack.app, 'admin', 'admin.entry.html'), 30, (content, file) => {
//
//         let tmp = replace(content, {
//             file: configWebpack.server.timejs,
//             isProd,
//         });
//
//         try {
//             tmp = template(tmp);
//         }
//         catch (e) {
//
//             throw `binding template '${file}' error, probably syntax error: ` + e.toString();
//         }
//
//         return params => {
//             try {
//
//                 return tmp(params);
//             }
//             catch (e) {
//
//                 tlog(`parsing template '${file}' error: `, e);
//             }
//         }
//     });
//
//     const fetch = fetchData({
//         routes,
//         logFlag: 'admin'
//     });
//
//     app.all(/\/admin([\/\?].*)?$/, (req, res) => {
//
//         const store = configureStore({
//             reducers
//         });
//
//         const twoDotsJWTToken = secured(req, res);
//
//         if (typeof twoDotsJWTToken === 'string' && twoDotsJWTToken) {
//
//             store.dispatch(loginSuccessWithJWTStringToken(twoDotsJWTToken));
//             // log('ADMIN: dispatch(login) is not triggered (postToGetReloadShortcut disabled mode)')
//         }
//
//         fetch({
//             url: req.url,
//             store,
//             jwtToken: jwtCookie(req, res).get()
//         }).then(mainRoute => {
//
//             try {
//
//                 const context = {};
//
//                 // const sheet = new ServerStyleSheet();
//
//                 // let html = renderToString(sheet.collectStyles(<RootServer
//                 //     store={store}
//                 //     location={req.url}
//                 //     context={context}
//                 // />));
//
//                 let htmlFromReact = renderToString(<RootServer
//                     store={store}
//                     location={req.url}
//                     context={context}
//                 />);
//
//                 if (context.status && context.status != 200) {
//
//                     res.status(context.status);
//                 }
//
//                 if (context.status === 301 || context.status === 302) {
//
//                     if (context.url) {
//
//                         return res.redirect(context.status, context.url);
//                     }
//
//                     tlog('context.url not specified');
//                 }
//
//                 // https://www.styled-components.com/docs/advanced#server-side-rendering
//                 // const styleTags = sheet.getStyleTags();
//
//                 let scriptWithPayload = '';
//
//                 if (twoDotsJWTToken !== undefined) {
//
//                     // it's gonna show only on response after post valid request to login
//                     scriptWithPayload = `<script>window.__JWT_TOKEN__ = ${serialize(twoDotsJWTToken)};</script>`;
//                 }
//
//                 // window.__PRELOADED_STATE__ = ${JSON.stringify(store.getState()).replace(/</g, '\\\\\u003c')};
//
//                 const replace = {
//                     html: htmlFromReact,
//                     // styleTags,
//                     // WARNING: See the following for security issues around embedding JSON in HTML:
//                     // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
//                     data: `<script>window.__PRELOADED_STATE__ = ${serialize(store.getState(), {space: isProd ? 0 : 2})};window.responsestatuscode = ${context.status || 200};window.responsestatusurl = "${req.url}";</script>${scriptWithPayload}`
//
//                 };
//
//                 let tmp = {
//                     ...replace,
//                     ...configPublic.htmlParams
//                 };
//
//                 tmp = htmlLazyLoaderTemplate()(tmp);
//
//                 isProd || (tmp = html.prettyPrint(tmp, {indent_size: 4}));
//
//                 res.send(tmp);
//
//             }
//             catch (e) {
//
//                 return Promise.reject({
//                     source: 'Admin SSR error try catch: ',
//                     e
//                 });
//             }
//         }).catch(reason => { // it must stay like this
//
//             log.start();
//
//             log.dump(reason);
//
//             let error = log.get(true).split("\n");
//
//             log.start();
//
//             log.dump(reason.stack);
//
//             let stack = log.get(true).split("\n");
//
//             // restrict to show full error by ip or other, or just log error
//             // logging error would be best idea
//             res
//                 .status(500)
//                 .set('Content-type', 'application/json; charset=utf-8')
//                 .send(JSON.stringify({
//                     message: 'Admin SSR error: ',
//                     error,
//                     stack
//                 }, null, '    '))
//             ;
//         });
//
//     });
// }('admin')); // admin vvv

// front vvv
(function () {

    const { default: RootServer } = require('./front/components/RootServer');

    const { default: routes } = require('./front/routes');

    // const { loginSuccessWithJWTStringToken } = require('./front/_redux/actions');

    const reducers = require('./front/_redux/reducers').default;

    const htmlLazyLoaderTemplate = require('roderic/libs/fileLazyLoader')(path.resolve(configWebpack.app, '..', 'index.html'), 30, (content, file) => {

        let tmp = replace(content, {
            file: configWebpack.server.timejs,
            isProd,
        });

        try {
            tmp = template(tmp);
        }
        catch (e) {

            throw `binding template '${file}' error, probably syntax error`;
        }

        return params => {
            try {
                return tmp(params);
            }
            catch (e) {
                tlog(`parsing template '${file}' error: `, e);
            }
        }
    });

    cascadeMeta(routes);

    const fetch = fetchData({
        routes: routes.nested,
        trigger : routes.trigger
    });

    app.use((req, res) => {

        // read later: TTFB https://hackernoon.com/whats-new-with-server-side-rendering-in-react-16-9b0d78585d67#ee91
        // if we want to handle 301 or 404 i you shouldnt use TTFB

        const store = configureStore({
            reducers
        });

        const twoDotsJWTToken = secured(req, res);

        if (typeof twoDotsJWTToken === 'string' && twoDotsJWTToken) {

            // store.dispatch(loginSuccessWithJWTStringToken(twoDotsJWTToken));
            // log('ADMIN: dispatch(login) is not triggered (postToGetReloadShortcut disabled mode)')
        }

        fetch({
            url: req.url,
            store,
            jwtToken: jwtCookie(req, res).get()
        })
            .then(mainRoute => {

                try {

                    const context = {};

                    // const sheet = new ServerStyleSheet();

                    // let html = renderToString(sheet.collectStyles(<RootServer
                    //     store={store}
                    //     location={req.url}
                    //     context={context}
                    // />));

                    let htmlFromReact = renderToString(<RootServer
                        store={store}
                        location={req.url}
                        context={context}
                    />);

                    if (context.status && context.status != 200) {

                        res.status(context.status);
                    }

                    if (context.status === 301 || context.status === 302) {

                        if (context.url) {

                            return res.redirect(context.status, context.url);
                        }

                        tlog('context.url not specified');
                    }

                    // https://www.styled-components.com/docs/advanced#server-side-rendering
                    // const styleTags = sheet.getStyleTags();

                    let scriptWithPayload = '';

                    if (twoDotsJWTToken !== undefined) {

                        // it's gonna show only on response after post valid request to login
                        scriptWithPayload = `<script>window.__JWT_TOKEN__ = ${serialize(twoDotsJWTToken)};</script>`;
                    }

                    // window.__PRELOADED_STATE__ = ${JSON.stringify(store.getState()).replace(/</g, '\\\\\u003c')};

                    const replace = {
                        html: htmlFromReact,
                        // styleTags,
                        // WARNING: See the following for security issues around embedding JSON in HTML:
                        // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
                        data: `<script>window.__PRELOADED_STATE__ = ${serialize(store.getState(), {space: isProd ? 0 : 2})};window.responsestatuscode = ${context.status || 200};window.responsestatusurl = "${req.url}";</script>${scriptWithPayload}`,
                        meta: mainRoute.meta
                    };

                    let tmp = {
                        ...replace,
                        ...configPublic.htmlParams
                    };

                    tmp = htmlLazyLoaderTemplate()(tmp);

                    isProd || (tmp = html.prettyPrint(tmp, {indent_size: 4}));

                    res.send(tmp);
                }
                catch (e) {

                    return Promise.reject({
                        source: 'SSR error try catch: ',
                        e
                    });
                }
            }).catch(reason => { // it must stay like this

            log.start();

            log.dump(reason);

            let error = log.get(true).split("\n");

            log.start();

            log.dump(reason.stack);

            let stack = log.get(true).split("\n");

            stack.shift();

            // restrict to show full error by ip or other, or just log error
            // logging error would be best idea
            res
                .status(500)
                .set('Content-type', 'application/json; charset=utf-8')
                .send(JSON.stringify({
                    message: 'SSR error: ',
                    error,
                    stack
                }, null, '    '))
            ;
        });
    });
}()); // front ^^^

// app.listen(port, host, () => {
//
//     console.log(`\n 🌎  Server is running `.green + ` ${host}:${port} `.bgBlue.yellow + "\n")
// });

// for sockets
server.listen( // ... we have to listen on server
    port,
    host,
    undefined, // io -- this extra parameter
    () => {

        console.log(`\n 🌎  Server is running `.green + ` ${host}:${port} `.bgBlue.yellow + "\n")
    }
);

