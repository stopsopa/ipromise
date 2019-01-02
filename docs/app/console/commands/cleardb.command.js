
const knex          = require('@stopsopa/knex-abstract');

const configServer  = require('../../server.config');

knex.init(configServer.knex);

module.exports = {
    execute: async function (args, {log, color, c}) {

        let i = 10;

        const common = knex().model.common;

        const listTables = async () => {


            let tables = await common.query(`
show tables        
`);

            return Object.values(tables).map(t => Object.values(t).pop());
        }

        const loop = async () => {

            color("loop: ", i, 'g');

            let tables = await listTables();

            if (tables) {

                if (i) {

                    i -= 1;

                    await Promise.all(tables.map(async table => {

                        try {

                            await common.query("drop table `" + table + "`");

                            log.t(`table '${table}' dropped...`);
                        }
                        catch (e) {

                            return 'continue...';
                        }
                    }));

                    await loop();
                }
                else {

                    let tables = await listTables();

                    c("stop -> numbrer of tables in db: " + tables.length, 'g');
                }
            }
            else {

                c('no more tables found', 'g');
            }
        };

        try {

            await loop();
        }
        catch (e) {

            log.dump(e, 2);

            return 2
        }

        return 0;
    },
    description: function (args) {
        return 'removes all tables in db - be careful'
    },
};
