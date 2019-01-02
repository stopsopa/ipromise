/**
 * @author Szymon Działowski
 * @license MIT License (c) copyright 2017-present original author or authors
 * @homepage https://github.com/stopsopa/roderic
 */

'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

require('@stopsopa/dotenv-up')(2, true, 'react/webpack.config.js');

const path                  = require('path');
const fs                    = require('fs');
const webpack               = require('webpack');
const utils                 = require('roderic/webpack/utils');
const MiniCssExtractPlugin  = require("mini-css-extract-plugin");
const CleanWebpackPlugin    = require('clean-webpack-plugin');
const UglifyJSPlugin        = require('uglifyjs-webpack-plugin');
const NodeExternals         = require('webpack-node-externals');
// const log                   = require(path.resolve('webpack', 'logn'));
const ReloadServerPlugin    = require('reload-server-webpack-plugin');
const BundleAnalyzerPlugin  = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')

require('colors');

const node_modules = path.join(__dirname, 'node_modules');

utils.setup(path.resolve('config.js'));

const extensions = ['.js', '.jsx', '.json'];
// style files regexes
const cssRegex = /\.css$/;
const sassRegex = /\.(scss|sass)$/;

// lodad webpack/* libraries this way to give developer ability to override them in app/react/webpack directory
// the only lib that can't be overrided is webpack/utils.js but still in emergency user can override
// loading from different location it in this file in this line
//      const utils                 = require('roderic/webpack/utils');
// this would be rather extreme situation (the need of overriding utils.js) but developer still have ability to do achieve it though
const req = (function (loc, extensions) {

    const l = loc.length;

    const ll = extensions.length;

    let i, ii, p, e;

    return lib => {

        for (i = 0 ; i < l ; i += 1 ) {

            for (ii = 0 ; ii < ll ; ii += 1 ) {

                p = loc[i] + path.sep + lib + extensions[ii];

                // console.log(`\np: ${JSON.stringify(p)}`);

                if (fs.existsSync(p)) {

                    return require(p);
                }
            }
        }

        throw `Couldn't load '${lib}' from any of directories: ${JSON.stringify(loc)}, under any extension: ${JSON.stringify(extensions)}`;
    };
}([
    utils.config.app,
    path.join(utils.config.node_modules, 'roderic'),
], extensions));

const log                   = require('inspc');

/**
 * common
 */
const commonRules = [
    {
        // https://babeljs.io/docs/plugins/transform-object-rest-spread/
        test: /\.js$/,
        // exclude: /(node_modules|bower_components)/,
        exclude: ((list, roderic) => {
            const len = list.length;
            let i, pp;
            return p => {

                pp = fs.realpathSync(p);

                if (pp.indexOf(roderic) > -1) {

                    return false;
                }

                for ( i = 1 ; i < len ; i += 1 ) {

                    if (pp.indexOf(list[i]) > -1) {

                        return true;
                    }
                }

                return false;
            };
        })(
            [
                path.sep + 'node_modules' + path.sep,
                // path.sep + 'bower_components' + path.sep
            ],
            path.sep + 'roderic' + path.sep
        ),
        use: {
            loader: path.resolve(node_modules, 'babel-loader'),
            options: {

                // https://github.com/facebook/create-react-app/tree/master/packages/babel-preset-react-app


                //                 ore automatic migration, we have updated babel-upgrade,
                //                 https://github.com/babel/babel-upgrade to do this for you with
                //                 "npx babel-upgrade".
                //
                //                     If you want the same configuration as before:
                //
                //                     {
                //                         "plugins": [
                //                             // Stage 0
                //                             "@babel/plugin-proposal-function-bind", -------------
                //
                //                                 // Stage 1
                //                                 "@babel/plugin-proposal-export-default-from", +++++++++++++++++++++++++
                //                                 "@babel/plugin-proposal-logical-assignment-operators", ---------------------
                //                                 ["@babel/plugin-proposal-optional-chaining", { "loose": false }], -----------------
                //                                 ["@babel/plugin-proposal-pipeline-operator", { "proposal": "minimal" }], ----------------
                //                                 ["@babel/plugin-proposal-nullish-coalescing-operator", { "loose": false }], -------------
                //                                 "@babel/plugin-proposal-do-expressions", -----------------
                //
                //                                 // Stage 2
                //                                 ["@babel/plugin-proposal-decorators", { "legacy": true }], --------------------
                //                                 "@babel/plugin-proposal-function-sent", ---------------
                //                                 "@babel/plugin-proposal-export-namespace-from", ++++++++++++++++++++
                //                                 "@babel/plugin-proposal-numeric-separator", -------------
                //                                 "@babel/plugin-proposal-throw-expressions", ----------------
                //
                //                                 // Stage 3
                //                                 "@babel/plugin-syntax-dynamic-import", --------------
                //                                 "@babel/plugin-syntax-import-meta", ??????????????-----------------
                //                             ["@babel/plugin-proposal-class-properties", { "loose": false }], +++++++++++++
                //         "@babel/plugin-proposal-json-strings" -----------------
                // ]
                // }
                //
                // If you're using the same configuration across many separate projects,
                // keep in mind that you can also create your own custom presets with
                //     whichever plugins and presets you're looking to use.
                //
                // module.exports = function() {
                //     return {
                //         plugins: [
                //             require("@babel/plugin-syntax-dynamic-import"),
                //             [require("@babel/plugin-proposal-decorators"), { "legacy": true }],
                //             [require("@babel/plugin-proposal-class-properties"), { "loose": false }],
                //         ],
                //         presets: [
                //             // ...
                //         ],
                //     };
                // };


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
                    '@babel/plugin-transform-async-to-generator', // async await
                    '@babel/plugin-transform-destructuring', // const {a,b,c,...rest} = obj;
                    //
                    //
                    //
                    //
                    // "@babel/plugin-proposal-async-generator-functions",
                    // "@babel/plugin-proposal-json-strings",
                    // "@babel/plugin-proposal-unicode-property-regex",
                    // "@babel/plugin-syntax-async-generators",
                    // "@babel/plugin-syntax-object-rest-spread",
                    // "@babel/plugin-transform-arrow-functions",
                    // "@babel/plugin-transform-duplicate-keys",
                    // "@babel/plugin-transform-function-name",
                    // "@babel/plugin-transform-modules-amd",
                    // "@babel/plugin-transform-modules-commonjs",
                    // "@babel/plugin-transform-modules-systemjs",
                    // "@babel/plugin-transform-parameters",
                    // "@babel/plugin-transform-regenerator",
                    // "@babel/plugin-transform-shorthand-properties",
                    // "@babel/plugin-transform-spread",
                    // "@babel/plugin-transform-sticky-regex",
                    // "@babel/plugin-transform-template-literals",
                    // "@babel/plugin-transform-typeof-symbol",
                    // "@babel/plugin-transform-unicode-regex",
                ],
                sourceMap: process.env.NODE_ENV === 'production', // i think it will be ignored // https://github.com/babel/babel-loader#options
            }
            // options: {
            //     babelrc: false,
            //     presets: [
            //         path.resolve(node_modules, 'babel-preset-env'),
            //         path.resolve(node_modules, 'babel-preset-react'),
            //         path.resolve(node_modules, 'babel-preset-stage-0')
            //     ],
            //     plugins: [
            //         path.resolve(node_modules, 'babel-plugin-transform-async-to-generator'),
            //     ],
            //     sourceMap: process.env.NODE_ENV === 'production',
            //     // This is a feature of `babel-loader` for webpack (not Babel itself).
            //     // It enables caching results in ./node_modules/.cache/babel-loader/
            //     // directory for faster rebuilds.
            //     cacheDirectory: true,
            // }
        }
    },
    {
        test: /\.(jpe?g|gif|png|eot|woff2?|ttf|svg)$/,
        // loader: 'file-loader?emitFile=false&name=[path][name].[ext]',
        use: {
            loader: path.resolve(node_modules, 'file-loader'),
            options: { // https://github.com/webpack-contrib/file-loader/tree/docs
                emitFile: false,
                name: '[path][name].[ext]',
                publicPath: utils.config.js.assetPrefix,
                context: utils.config.web,
                useRelativePath: false,
                sourceMap: process.env.NODE_ENV === 'production'
            }
        }
    }
];

const resolve = {
    modules: utils.symlink(utils.config.resolve, false, true),
    extensions,
    symlinks: false // to properly resolve url() in css/scss through web symlink
};

// common function to get style loaders
const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: Object.assign(
                {},
                // shouldUseRelativeAssetPaths ? { publicPath: '../../' } : undefined
            ),
        },
        {
            loader: require.resolve('css-loader'),
            options: cssOptions,
        },
        {
            // Options for PostCSS as we reference these options twice
            // Adds vendor prefixing based on your specified browser support in
            // package.json
            loader: require.resolve('postcss-loader'),
            options: {
                // Necessary for external CSS imports to work
                // https://github.com/facebook/create-react-app/issues/2677
                ident: 'postcss',
                plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    require('postcss-preset-env')({
                        autoprefixer: {
                            flexbox: 'no-2009',
                        },
                        stage: 3,
                    }),
                ],
                sourceMap: process.env.NODE_ENV === 'development',
            },
        },
    ];
    if (preProcessor) {
        loaders.push({
            loader: require.resolve(preProcessor),
            options: {
                sourceMap: process.env.NODE_ENV === 'development',
            },
        });
    }
    return loaders;
};
/**
 * https://github.com/kriasoft/react-starter-kit/issues/771#issuecomment-236359383
 * SyntaxError: Unexpected token .
 */
const cssuse = [
    {
        test: cssRegex,
        // exclude: cssModuleRegex,
        loader: getStyleLoaders({
            importLoaders: 1,
            sourceMap: process.env.NODE_ENV === 'development',
        }),
        // Don't consider CSS imports dead code even if the
        // containing package claims to have no side effects.
        // Remove this when webpack adds a warning or an error for this.
        // See https://github.com/webpack/webpack/issues/6571
        sideEffects: true,
    },
    {
        test: sassRegex,
        // exclude: sassModuleRegex,
        loader: getStyleLoaders(
            {
                importLoaders: 2,
                sourceMap: process.env.NODE_ENV === 'development',
            },
            'sass-loader'
        ),
        // Don't consider CSS imports dead code even if the
        // containing package claims to have no side effects.
        // Remove this when webpack adds a warning or an error for this.
        // See https://github.com/webpack/webpack/issues/6571
        sideEffects: true,
    },
    // {
    //     loader: path.resolve(node_modules, 'css-loader'),
    //     options: {
    //         minimize: process.env.NODE_ENV === 'production',
    //         sourceMap: process.env.NODE_ENV === 'production',
    //     }
    // },
    // {
    //     loader: require.resolve('postcss-loader'),
    //     options: {
    //         // Necessary for external CSS imports to work
    //         // https://github.com/facebookincubator/create-react-app/issues/2677
    //         ident: 'postcss',
    //         plugins: () => [
    //             require('postcss-flexbugs-fixes'),
    //             require('autoprefixer')({
    //                 browsers: [
    //                     '>1%',
    //                     'last 4 versions',
    //                     'Firefox ESR',
    //                     'not ie < 9', // React doesn't support IE8 anyway
    //                 ],
    //                 flexbox: 'no-2009',
    //             }),
    //         ],
    //         sourceMap: process.env.NODE_ENV === 'production'
    //     },
    // },
];
const web = {
    mode: process.env.NODE_ENV,
    name: `[ ${utils.config.name} ]`.blue + ` browser bundling`.yellow,
    entry: utils.entries(),
    context: __dirname,
    output: {
        path: utils.config.js.outputForWeb,
        filename: "[name].bundle.js",
    },
    resolve: Object.assign({}, resolve),
    devtool: "source-map",
    module: {
        rules: [
            ...commonRules,
            ...cssuse,
            // {
            //     // https://webpack.js.org/loaders/style-loader/
            //     test: /\.scss/,
            //     use: ExtractTextPlugin.extract({
            //         fallback: {
            //             loader: path.resolve(node_modules, 'style-loader'),
            //             options: {
            //                 sourceMap: process.env.NODE_ENV === 'production',
            //             }
            //         },
            //         use: cssuse.concat([
            //             {
            //                 loader: path.resolve(node_modules, 'sass-loader'),
            //                 options: {
            //                     sourceMap: process.env.NODE_ENV === 'production'
            //                 }
            //             }
            //         ])
            //     }),
            // },
            // {
            //
            //     // https://webpack.js.org/loaders/style-loader/
            //     test: /\.css$/,
            //     use: ExtractTextPlugin.extract({
            //         fallback: {
            //             loader: path.resolve(node_modules, 'style-loader'),
            //             options: {
            //                 sourceMap: process.env.NODE_ENV === 'production',
            //             }
            //         },
            //         use: cssuse
            //     }),
            // }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': (function () {

                const tmp = {
                    NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                };

                const dotenv = require('roderic/webpack/dotenv');

                dotenv.webload(dotenv.parse(path.resolve(utils.config.root, '.env')), 'web');

                const env = dotenv();

                Object.keys(env).forEach(key => {
                    tmp[key] = JSON.stringify(env[key]);
                });

                return tmp;
            }())
        }),
        new ErrorOverlayPlugin(),
    ]
};

/**
 * Nice example of webpack plugin
 */
// if (utils.config.changeCacheGetTimestamp) {
//     (function (HtmlCachePlugin) {
//         web.plugins.push(new HtmlCachePlugin(utils.config.changeCacheGetTimestamp));
//     }(req('webpack/HtmlCachePlugin')));
// }

if (utils.config.provide && Object.keys(utils.config.provide).length) { // https://webpack.js.org/plugins/provide-plugin/

    web.plugins.push(new webpack.ProvidePlugin(utils.config.provide));
}
if (process.env.NODE_ENV === 'production') {

    // https://webpack.js.org/configuration/devtool/
    // http://cheng.logdown.com/posts/2016/03/25/679045
    // devtool: "eval-source-mahhp"
    // devtool: "cheap-eval-source-map"
    web.devtool = false;

    web.plugins.push(new UglifyJSPlugin({
        sourceMap: true,
        parallel: true
    }));
}

if (process.argv.indexOf('--color') > -1) {

    web.plugins.push(new BundleAnalyzerPlugin())
}

if (utils.config.alias && Object.keys(utils.config.alias).length) {

    web.resolve.alias = utils.config.alias;
}


// const webpackConfigsList = [web]; // was like this
// but now to provide error-overlay-webpack-plugin functionality I'm doing like this
const webpackConfigsList = [];
Object.keys(web.entry).forEach((name, i) => {

    const w = Object.assign({}, web, {
        entry: [web.entry[name]],
        output: Object.assign({}, web.output, {
            filename: web.output.filename.replace('[name]', name)
        }),
        plugins: [
            ...web.plugins,
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: `${name}.bundle.css`,
                // chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
            }),
            (i === 0) ? (
                new CleanWebpackPlugin([utils.config.js.outputForWeb], {
                    root: utils.config.root
                })
            ) : false
        ].filter(Boolean)
    })

    webpackConfigsList.push(w);
});

const serverEndpoints = utils.entries("/**/*.server.js", true);

if (Object.keys(serverEndpoints).length) {

    /**
     * server
     */
    const server = {
        mode: process.env.NODE_ENV,
        name: `[ ${utils.config.name} ]`.blue + ` server-side rendering`.yellow,
        entry: serverEndpoints,
        target: 'node',
        context: __dirname,
        node: {
            // https://github.com/webpack/webpack/issues/1599
            __dirname: true,
            __filename: true
        },
        externals: [
            NodeExternals({
                modulesDir: node_modules, // https://www.npmjs.com/package/webpack-node-externals#optionsmodulesdir-node_modules
                whitelist: p => {

                    if (p.indexOf('roderic/') === 0) {

                        return true;
                    }

                    return false;
                }
            })
        ],
        output: {
            path: utils.config.js.outputForServer,
            filename: "[name].js",
            libraryTarget: 'commonjs2'
        },
        resolve : Object.assign(
            {},
            resolve,
        ),
        devtool: "source-map",
        module: {
            rules: [
                ...commonRules,
                {
                    // https://webpack.js.org/loaders/style-loader/
                    test: /\.s?css$/,
                    loader: path.resolve(node_modules, 'css-loader/locals')
                }


                //             test: /\.(jpe?g|gif|png|eot|woff2?|ttf|svg)$/,
                //     // loader: 'file-loader?emitFile=false&name=[path][name].[ext]',
                //     use: {
                //     loader: path.resolve(node_modules, 'file-loader'),
                //         options: { // https://github.com/webpack-contrib/file-loader/tree/docs
                //         emitFile: false,
                //             name: '[path][name].[ext]',
                //             publicPath: '/',
                //             context: utils.config.web,
                //             useRelativePath: false,
                //             sourceMap: process.env.NODE_ENV === 'production'
                //     }
                // }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': (function () {

                    const tmp = {
                        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                    };

                    const dotenv = require('roderic/webpack/dotenv');

                    dotenv.webload(dotenv.parse(path.resolve(utils.config.root, '.env'), false), 'server');

                    const env = dotenv();

                    Object.keys(env).forEach(key => {
                        tmp[key] = JSON.stringify(env[key]);
                    });

                    return tmp;
                }())
            }),
            new webpack.ProvidePlugin({
                log: 'log'
            })
        ]
    }

    if (utils.config.externalsForServer && utils.config.externalsForServer.length) {

        server.externals.push((context, request, callback, tmp) => {

            //context /Users/sd/Workspace/projects/z_ping-webgui/runtime/public_html/app
            //request ./server.config

            if ( utils.config.externalsForServer.indexOf(tmp = path.resolve(context, request + '.js')) > -1 ) {

                return callback(null, 'commonjs2 .' + path.sep + path.relative(utils.config.js.outputForServer, tmp));
            }

            callback();
        });
    }

    if ( (process.argv.indexOf('--watch') > -1) && utils.config.server && utils.config.server.watchAndReload) {

        server.plugins.push(new ReloadServerPlugin({
            script: utils.config.server.watchAndReload,
        }));
    }

    // if (process.env.NODE_ENV === 'production') { // keep always sourcemaps for server
    //
    //     server.devtool = "source-map";
    // }

    if (process.argv.indexOf('--color') > -1) {

        server.plugins.push(new BundleAnalyzerPlugin())
    }

    if (utils.config.provide && Object.keys(utils.config.provide).length) { // https://webpack.js.org/plugins/provide-plugin/

        server.plugins.push(new webpack.ProvidePlugin(utils.config.provide));
    }

    if (utils.config.alias && Object.keys(utils.config.alias).length) {

        server.resolve.alias = utils.config.alias;
    }

    webpackConfigsList.push(server);
}
else {

    console.log("Server side webpack config ignored - *.server.js not found\n".red);
}

if (process.env.NODE_ENV === 'development') {

    // Turn off performance hints during development because we don't do any
    // splitting or minification in interest of speed. These warnings become
    // cumbersome.
    webpackConfigsList.forEach(config => config.performance = {hints: false});
}

module.exports = webpackConfigsList;

// // https://nodejs.org/docs/latest/api/all.html#modules_accessing_the_main_module
if (require.main === module) {

    require(path.resolve(__dirname, 'preprocessor'))({
        timejs: utils.config.server.timejs
    });

    // if (process.argv.indexOf('--htmlcache') > -1) {
    //
    //     if (utils.config.changeCacheGetTimestamp) {
    //
    //         const htmlcache = req('webpack/htmlcache');
    //
    //         const time = htmlcache.now();
    //
    //         utils.config.changeCacheGetTimestamp.forEach(file => {
    //
    //             console.log(`htmlcache(${file})`);
    //
    //             htmlcache.inFile(file, time);
    //         })
    //     }
    //     else {
    //         console.log(`no utils.config.changeCacheGetTimestamp specified in config.js`);
    //     }
    //
    //     process.exit(0);
    // }
    // direct

    console.log('Mounting symlinks:');

    console.log("\n    assets:");

    utils.symlink(utils.config.asset, true);

    console.log("\n    resolver:");

    utils.symlink(utils.config.resolve);
}
