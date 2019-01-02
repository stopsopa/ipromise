
const transport         = require('../webpack/transport');

const fetchJson         = transport.fetchJson;

const configServer      = require('../../server.config');

const md5               = require('md5');

const jwt_secret_md5    = md5(configServer.jwt.jwt_secret);

module.exports = {
    execute: async function (args, {log, color, c}) {

        try {

            const json = await fetchJson('/routes', {
                method: 'post',
                body: {
                    jwt_secret_md5,
                }
            });

            log.json(json);

            return 0;
        }
        catch (e) {

            log.dump({
                routes_command_error: e
            }, 10)

            return 1;
        }
    },
    description: function (args) {
        return 'list all registered routes'
    },
};
