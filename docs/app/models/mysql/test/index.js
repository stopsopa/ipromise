
import { Router } from 'express';

import knex from '@stopsopa/knex-abstract';

export default async (req, res) => {

    const man = knex().model.users;

    // let result = await man.raw('select * from users where :id: = :id', {
    //     id: 2
    // });
    // let result = await knex().raw('select * from users where :id: = ?', [1]);

    // const result = await man.raw(`select * from :table: where id in (:name)`, {
    //     name: [1,3,40]
    // }, true);

    // const result = await man.query(`select * from :table: where :id: in (?) and :id: notd in (?)`, [
    //     [1,2,40],
    //     ['one', 'two'],
    // ], true);

    // const result = await man.count();

    // const result = await man.find(true, 1);
    // const result = await man.find(true, 1, 'id');

    // const result = await man.findAll(true);

    // const result = await man.insert(true, {
    //     firstName: 'first',
    //     lastName: 'last',
    //     email: 'email@gmail8.com',
    //     password: 'ppp',
    // });

    // const result = await man.update({
    //     enabled: false
    // });

    // const result = await man.update(true, {
    //     enabled: 0
    // }, {
    //     firstName: 'first'
    // });

    // const result = await man.queryOne('select * from :table: where id in (?)', [[1,2]])
    //     .catch(e => log.dump(e))
    // ;
    // const result = await man.queryOne('select * from :table: where id = :id', {
    //     id: 15
    // });
    // const result = await man.queryOne('select * from :table: where id in (:ids)', {
    //     ids: [3, 1]
    // });

    // const result = await man.delete(true, [15,9,7]);

    const data = {
        test: 'test',
        entity: result,
    };

    res.jsonNoCache(data);
}