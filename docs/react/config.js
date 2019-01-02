/**
 * @author Szymon Działowski
 * @license MIT License (c) copyright 2017-present original author or authors
 * @homepage https://github.com/stopsopa/roderic
 */

'use strict';

require('roderic/libs/restrict-to-node')(__filename);

const path              = require("path");

const root              = path.resolve(__dirname, '..');

// relative path to public server directory
const web               = path.resolve(root, 'public');

const asset             = path.resolve(web, 'asset');

const node_modules      = path.join(__dirname, 'node_modules');

const app               = path.resolve(root, 'app');

require('@stopsopa/dotenv-up')(3, false, 'react/config.js');

const env               = require('roderic/webpack/dotenv');

const webpack           = __dirname;

module.exports = {
    // just name for this project, it's gonna show up in some places
    name: 'roderic',
    root: root,
    web: web,
    app: app,
    webpack: webpack,
    node_modules: node_modules,
    resolve: [ // where to search by require and files to watch

        app,

        webpack,

        // all custom libraries
        asset,

        'node_modules', // https://github.com/ReactTraining/react-router/issues/6201#issuecomment-403291934

        { // node_modules exposed on web - symlink mode
            path: node_modules,
            link: path.resolve(asset, 'public')
        }
    ],
    asset: [ // just create links, this links are not direct paths for resolver
        {
            path: path.resolve(root, 'app', 'assets'),
            link: path.resolve(asset, 'app')
        },
        // {
        //     path: path.resolve(root, 'puppeteer', 'test', 'roderic', 'public'),
        //     link: path.resolve(asset, 'puppeteer')
        // },
        
    ],
    alias: {
        // log         : path.resolve(__dirname, 'webpack', 'logn'), // not needed since app added to resolver
        log         : 'inspc',
        // transport   : path.resolve(app, 'transport'), // not needed since app added to resolver
        transport   : 'roderic/libs/transport', // not needed since app added to resolver
        selenium    : 'roderic/libs/selenium',
    },
    provide: { // see format: https://webpack.js.org/plugins/provide-plugin/
        log: 'log',
    },
    js: {
        entries: [ // looks for *.entry.{js|jsx} - watch only on files *.entry.{js|jsx}
            app,
            // ...
        ],        
        outputForWeb    : path.resolve(web, 'dist'),
        outputForServer : path.resolve(webpack, 'servers'),
        assetPrefix: '/'
    },
    externalsForServer: [ // can be achieved with eval('require')('server.config.js')
        path.resolve(app, 'server.config.js'),
        path.resolve(app, 'public.config.js'),
        path.resolve(webpack, 'config.js')
    ],
    server: {
        host: env('NODE_HOST'),
        port: env('NODE_PORT'),
        watchAndReload  : path.resolve(__dirname, 'servers', 'index.js'),
        timejs          : path.resolve(__dirname, 'servers', 'time.js'),
    },
}

