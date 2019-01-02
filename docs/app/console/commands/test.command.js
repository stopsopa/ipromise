
const knex          = require('@stopsopa/knex-abstract');

const configServer  = require('../../server.config');

knex.init(configServer.knex);

const delay = require('roderic/webpack/delay');

module.exports = {
    execute: function (args, {log, color, c}) {
        this.log('console deep execute');
        this.log.dump(process.env);
        this.log.dump(args.all());

        return 0;
    },
    // publicMethods: ['knex'],
    description: function (args) {
        return 'description of command test.js'
    },
    /**
     * This tells the core that method command.test() can be executed directly from cli like:
     *    /bin/bash console.sh test help --testparam value1 value2
     */
    publicMethods: ['help', 'knex'],
    help: function (args, {log, color, c}) {

        this.log('console deep help');

        // this.log.dump(process.env);

        this.log.dump(args.all());
    },
    knex: async function (args, {log, color, c}) {

        const users = await knex().model.users.findAll();

        await delay(2000);

        log('users');
        log.dump(users, 2);

        return 0;
    }
};
