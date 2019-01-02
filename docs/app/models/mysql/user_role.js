
const abstract          = require('@stopsopa/knex-abstract');

const extend            = abstract.extend;

const prototype         = abstract.prototype;

const log               = require('inspc');

const a                 = prototype.a;

module.exports = knex => extend(knex, prototype, {

}, 'user_role');