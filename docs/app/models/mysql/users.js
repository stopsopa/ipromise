
const abstract          = require('@stopsopa/knex-abstract');

const extend            = abstract.extend;

const prototype         = abstract.prototype;

const log               = require('inspc');

const a                 = prototype.a;

const validator         = eval('require')('@stopsopa/validator');

const {
    Optional,
    Required,
    Collection,
    All,
    Length,
    NotBlank,
    Type,
    Email,
    Count,
} = validator;

module.exports = knex => extend(knex, prototype, {
    initial: async function () {

        const id = await this.raw(`
select r.id from roles r where r.name = ?
`, ['user']).then(role => {
            try {
                return role[0][0].id;
            }
            catch (e) {

            }
        });

        const roles = [];

        if (id) {

            roles.push(id);
        }

        return {
            firstName   : '',
            lastName    : '',
            email       : '',
            password    : '',
            enabled     : false,
            roles,
        }
    },
    fromDb: row => {

        if ( ! row ) {

            return;
        }

        if (typeof row.roles === 'string') {

            row.roles = row.roles.split(',').map(r => /^\d+$/.test(r) ? parseInt(r, 10) : r);
        }

        if ( ! Array.isArray(row.roles) ) {

            row.roles = [];
        }

        if (typeof row.enabled !== 'undefined') {

            row.enabled = !!row.enabled;
        }

        if (typeof row.config === 'string') {

            try {

                row.config = JSON.parse(row.config);
            }
            catch (e) {

                row.config = {};
            }
        }

        return row;
    },
    toDb: row => {

        if (typeof row.roles !== 'undefined') {

            delete row.roles;
        }

        if (typeof row.created !== 'undefined') {

            delete row.created;
        }

        if (typeof row.updated !== 'undefined') {

            delete row.updated;
        }

        // if (!row.config) {
        //
        //     delete row.config;
        // }
        //
        // if (typeof row.config !== 'undefined' && typeof row.config !== 'string') {
        //
        //     row.config = JSON.stringify(row.config, null, 4);
        // }

        return row;
    },
    update: function (...args) {

        let [debug, trx, entity, id] = a(args);

        if (Array.isArray(entity.roles)) {

            this.updateRoles(id, entity.roles)
        }

        return prototype.prototype.update.call(this, debug, trx, entity, id);
    },
    insert: async function (...args) {

        let [debug, trx, entity] = a(args);

        let roles = null;

        if (Array.isArray(entity.roles)) {

            roles = entity.roles;
        }

        entity = this.toDb(Object.assign({}, entity));

        const id = await prototype.prototype.insert.call(this, debug, trx, entity);

        if (roles) {

            await this.updateRoles(id, roles);
        }

        return id;
    },
    delete: async function (id, ...args) {

        await this.clearRoles(id);

        return await prototype.prototype.delete.call(this, id, ...args);
    },
    updateRoles: async function (userId, rolesIds) {

        await this.clearRoles(userId);

        if (Array.isArray(rolesIds)) {

            return await Promise.all(rolesIds.map(async role_id => {
                return await knex.model.user_role.insert({
                    user_id: userId,
                    role_id,
                })
            }));
        }
    },
    clearRoles: async function(userId) {

        return await this.query(`delete from user_role where user_id = ?`, [userId]);
    },
    find: function (...args) {

        let [debug, trx, id] = a(args);

        if ( ! id ) {

            throw `user.js::find(): id not specified or invalid`;
        }

        const data = this.raw(debug, trx, `
SELECT          u.*, GROUP_CONCAT(r.id) roles
FROM            users u
LEFT JOIN       user_role ur
		     ON ur.user_id = u.id
LEFT JOIN       roles r
		     ON ur.role_id = r.id
WHERE           u.id = ?
GROUP BY        u.id
ORDER BY        id desc
        `, [id]).then(data => {
            return data[0][0];
        }).then(this.fromDb);

        return data;
    },
    findAll: function (...args) {

        let [debug, trx] = a(args);

        const data = this.raw(debug, trx, `
SELECT          u.*, GROUP_CONCAT(r.name) roles
FROM            users u
LEFT JOIN       user_role ur
		     ON ur.user_id = u.id
LEFT JOIN       roles r
		     ON ur.role_id = r.id
GROUP BY        u.id
ORDER BY        id desc
        `).then(data => {
            return data[0];
        }).then(list => list.map(this.fromDb));

        return data;
    },
    prepareToValidate: function (data = {}, mode) {

        if (typeof data.id !== 'undefined') {

            delete data.id;
        }

        delete data.created;

        delete data.updated;

        if (mode === 'create') {

//            if (empty($data['shortname']) && !empty($data['name'])) {
//
//                $data['shortname'] = Urlizer::urlizeTrim($data['name']);
//            }
        }

        // if (data.config === null) {
        //
        //     delete data.config;
        // }

        return data;
    },
    getValidators: function (mode = null, id) {
        return new Collection({
            id: new Optional(),
            firstName: new Required([
                new NotBlank(),
                new Length({max: 50}),
            ]),
            lastName: new Required([
                new NotBlank(),
                new Length({max: 50}),
            ]),
            email: new Required(new Email()),
            password: new Required([
                new NotBlank(),
                new Length({min: 8 ,max: 50}),
            ]),
            enabled: new Required(new Type('boolean')),
            roles: new Required([
                new Count({min: 1}),
                new All(new Type('integer'))
            ]),
            // config: new Optional(),
        });
    },
}, 'users', 'id');