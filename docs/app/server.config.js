/**
 * WARNING
 * WARNING
 * WARNING
 * WARNING
 * WARNING: these data shouldn't be NEVER imported/required in files that's gonna be exposed in browser
 * WARNING ... only in server scripts
 * WARNING
 * WARNING
 * WARNING: ... and don't remove this message, please...
 */

const path = require('path');

// const mysql = require('./models/mysql');

const node = typeof global !== 'undefined' && Object.prototype.toString.call(global.process) === '[object process]';

if ( ! node ) {

    const msg = `\n\n\nserver.config.js is included in web bundle - that's serious security issue\n\n\n`;

    window.addEventListener('DOMContentLoaded', () => setTimeout(() => document.write(msg), 500))

    alert(msg);

    throw msg;
}

const env = name => {
    if (!process.env[name]) {

        throw `server.config.js: Environement variable '${name}' doesn't exist`;
    }

    return process.env[name];
}

// const isProd = env('NODE_ENV') === 'production';

/**
 * Leave above too please, that's for secirity ^^^^
 */

// let sf_parameters;
// try {
//     sf_parameters     = require('../react/preprocessor/sf_parameters');
// }
// catch (e) {
//     throw `\n\n\n             Error: Can't load sf_parameters, first run preprocessor\n\n\n     Native error: ${e}\n\n\n`;
// }

const config = {
    controllers: true,
    knex: false,
    // knex: {
    //     def: 'mysql',
    //     // sqlite: {
    //     //     client: 'sqlite3',
    //     //     connection: {
    //     //         filename: path.resolve(__dirname, '..', 'db.sqlite')
    //     //     },
    //     //     debug: !isProd,
    //     //     asyncStackTraces: !isProd, // https://knexjs.org/#Installation-asyncStackTraces
    //     //     useNullAsDefault: true,
    //     // }
    //     mysql: {
    //         // CREATE DATABASE IF NOT EXISTS `dashboard` /*!40100 DEFAULT CHARACTER SET utf8 */
    //         // GRANT ALL PRIVILEGES ON dashboard.* To 'dashboard'@'%' IDENTIFIED BY 'pass';
    //         // SHOW GRANTS FOR 'dashboard';
    //         // DROP USER 'dashboard'
    //         connection: {
    //             host        : env('PROTECTED_MYSQL_HOST'),
    //             port        : env('PROTECTED_MYSQL_PORT'),
    //             user        : env('PROTECTED_MYSQL_USER'),
    //             password    : env('PROTECTED_MYSQL_PASS'),
    //             database    : env('PROTECTED_MYSQL_DB')
    //         },
    //         models: mysql,
    //     },
    //     test: {
    //         // CREATE DATABASE IF NOT EXISTS `dashboard` /*!40100 DEFAULT CHARACTER SET utf8 */
    //         // GRANT ALL PRIVILEGES ON dashboard.* To 'dashboard'@'%' IDENTIFIED BY 'pass';
    //         // SHOW GRANTS FOR 'dashboard';
    //         // DROP USER 'dashboard'
    //         client: 'mysql',
    //         connection: {
    //             host : env('PROTECTED_TEST_MYSQL_HOST'),
    //             user : env('PROTECTED_TEST_MYSQL_USER'),
    //             password : env('PROTECTED_TEST_MYSQL_PASS'),
    //             database : env('PROTECTED_TEST_MYSQL_DB')
    //         }
    //     },
    // },
    jwt: {
        // remote: {
        //     userProviderEndpoint    : '/api/userprovider',
        //     jwtTokenProvider        : '/api/jwttokenprovider',
        //     // userProviderEndpoint    : '/endpoint/userprovider',
        //     // jwtTokenProvider        : '/endpoint/jwttokenprovider',
        //     // jwttokendiff: ---> is defined in server.public.js
        // },
        users: [
            {
                username: 'admin',
                password: 'password',
                roles: [
                    'admin'
                ]
            },
            {
                username: 'test',
                password: 'password'
            }
        ],
        // WARNING: setup the same value also in php/app/config/parameters.yml -> jwt_secret
        jwt_secret: env('PROTECTED_JWT_SECRET'),

        // https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
        // param 'maxAge'
        jwt_expire: parseInt(env('PROTECTED_JWT_EXPIRE'), 10), // (seconds) change also public.config.js -> jwt.cookie_expire_after

        // cookie_expire_after: 22 * 60 * 60 * 1000, // 22 hours // change also server.config.js -> jwt.jwt_expire
        cookie_expire_after: parseInt(env('PROTECTED_JWT_EXPIRE'), 10) + (12 * 60 * 60), // + 12h
    },
    checkAcceptHeader: true,
    php_proxy: {
        //prefix - WARNING: don't declare it here, declare it in public.config.js because this parameter is used in transport.js
        schema  : env('NODE_SSR_PROTOCOL'),
        host    : env('NODE_SSR_HOST'),
        port    : parseInt(env('NODE_SSR_PORT'), 10) // WARNING; setup this also in docker/docker-compose.yml -> services.web.ports
        // the same endpoint:
        //   php    : http://localhost:8280/json
        //   node   : http://localhost:1025/endpoint/json
    },

    public: require('./public.config'),

    // redirections: require('./redirections')
}

if (require.main === module) {

    process.stdout.write(JSON.stringify(config, null, '    '));
}
else {

    module.exports = config;
}
