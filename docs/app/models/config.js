/**
 * Not used now, see server.config.js key "knex"
 * Not used now, see server.config.js key "knex"
 * Not used now, see server.config.js key "knex"
 * Not used now, see server.config.js key "knex"
 * Not used now, see server.config.js key "knex"
 * Not used now, see server.config.js key "knex"
 * Not used now, see server.config.js key "knex"
 * Not used now, see server.config.js key "knex"
 * Not used now, see server.config.js key "knex"
 */

require('@stopsopa/dotenv-up')(2, false, 'tests');

const mysql = require('./mysql');

module.exports = {
    def: 'mysql',
    // sqlite: {
    //     client: 'sqlite3',
    //     connection: {
    //         filename: path.resolve(__dirname, '..', 'db.sqlite')
    //     },
    //     debug: !isProd,
    //     asyncStackTraces: !isProd, // https://knexjs.org/#Installation-asyncStackTraces
    //     useNullAsDefault: true,
    // }
    mysql: {
        // CREATE DATABASE IF NOT EXISTS `dashboard` /*!40100 DEFAULT CHARACTER SET utf8 */
        // GRANT ALL PRIVILEGES ON dashboard.* To 'dashboard'@'%' IDENTIFIED BY 'pass';
        // SHOW GRANTS FOR 'dashboard';
        // DROP USER 'dashboard'
        client: 'mysql',
        connection: {
            host        : process.env.PROTECTED_MYSQL_HOST,
            port        : process.env.PROTECTED_MYSQL_PORT,
            user        : process.env.PROTECTED_MYSQL_USER,
            password    : process.env.PROTECTED_MYSQL_PASS,
            database    : process.env.PROTECTED_MYSQL_DB,
        },
        models: mysql,
    },
    // test: {
    //     // CREATE DATABASE IF NOT EXISTS `dashboard` /*!40100 DEFAULT CHARACTER SET utf8 */
    //     // GRANT ALL PRIVILEGES ON dashboard.* To 'dashboard'@'%' IDENTIFIED BY 'pass';
    //     // SHOW GRANTS FOR 'dashboard';
    //     // DROP USER 'dashboard'
    //     client: 'mysql',
    //     connection: {
    //         host        : process.env.PROTECTED_TEST_MYSQL_HOST,
    //         user        : process.env.PROTECTED_TEST_MYSQL_USER,
    //         password    : process.env.PROTECTED_TEST_MYSQL_PASS,
    //         database    : process.env.PROTECTED_TEST_MYSQL_DB,
    //     }
    // }
};