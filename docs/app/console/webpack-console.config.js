'use strict';

const path                  = require('path');

const fs                    = require('fs');

const CleanWebpackPlugin    = require('clean-webpack-plugin');

const webpack               = require('webpack');

const root                  = path.resolve(__dirname, '..', '..');

const app                   = path.resolve(root, 'app');

const webpackDir            = path.resolve(root, 'react');

const node_modules          = path.resolve(webpackDir, 'node_modules');

const output                = path.resolve(__dirname, 'webpack');

const inject                = require('./config');

const externalsForServer    = [
    path.resolve(app, 'server.config.js'),
    path.resolve(app, 'public.config.js'),
    path.resolve(webpackDir, 'config.js'),
];

const config = {
    mode: 'production',
    // target: 'node',
    entry: inject.entry,
    output: {
        // libraryTarget: 'umd',
        libraryTarget: 'commonjs2',
        path: output,
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        cacheCompression: false,
                        presets: [
                            '@babel/preset-react',
                            '@babel/preset-env',
                        ],
                        plugins: [
                            '@babel/plugin-proposal-object-rest-spread',
                            '@babel/plugin-proposal-export-default-from',
                            '@babel/plugin-proposal-export-namespace-from',
                            '@babel/plugin-proposal-class-properties',
                            '@babel/plugin-proposal-async-generator-functions',
                            '@babel/plugin-transform-async-to-generator',
                            '@babel/plugin-transform-destructuring',
                        ],
                        sourceMap: false,
                    }
                },
                exclude: ((list, roderic) => { // https://webpack.js.org/configuration/module/#condition
                    const len = list.length;
                    let i, pp;
                    return p => {

                        pp = fs.realpathSync(p);

                        if (pp.indexOf(roderic) > -1) {

                            console.log('roderic: ', pp, 'DON\'T EXCLUDE');

                            return false;
                        }

                        for ( i = 1 ; i < len ; i += 1 ) {

                            if (pp.indexOf(list[i]) > -1) {

                                console.log('exclude: ', pp, 'EXCLUDE');

                                return true;
                            }
                        }

                        console.log('exclude: ', pp, 'DON\'T EXCLUDE');

                        return false;
                    };
                })(
                    [
                        path.sep + 'node_modules' + path.sep,
                        // path.sep + 'bower_components' + path.sep
                    ],
                    path.sep + 'roderic' + path.sep
                ),
            },
        ]
    },
    resolve: {
        modules: [
            app,
            webpackDir,
            'node_modules',
            node_modules,
        ],
        alias: {
            log: 'inspc'
        }
    },
    externals: [
        (context, request, callback, tmp) => {

            if ( externalsForServer.indexOf(tmp = path.resolve(context, request + '.js')) > -1 ) {

                console.log('external: ', path.relative(output, tmp));

                return callback(null, 'commonjs2 .' + path.sep + path.relative(output, tmp));
            }

            for ( let i = 0, l = config.resolve.modules.length ; i < l ; i += 1 ) {

                if ( externalsForServer.indexOf(tmp = path.resolve(config.resolve.modules[i], request + '.js')) > -1 ) {

                    console.log('external module: ', path.relative(output, tmp));

                    return callback(null, 'commonjs2 .' + path.sep + path.relative(output, tmp));
                }
            }

            callback();
        }
    ],
    node: {
        process: false, // def true see: https://webpack.js.org/configuration/node/#node-process
    },
    optimization:{
        minimize: false,
    },
    performance: {
        hints: false
    },
    plugins: [
        new CleanWebpackPlugin(output),
        new webpack.ProvidePlugin({
            log: 'log',
        }),
    ]
};

module.exports = config;

