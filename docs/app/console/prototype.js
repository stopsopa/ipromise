
const prototype = function () {
    this.log = require('inspc');
};
prototype.prototype.description = function (args) {
    return '<no description() method available>'
},

prototype.extend = methods => {

    function command() {

        prototype.apply(this, arguments);
    }

    command.prototype = Object.create(prototype.prototype);

    Object.assign(command.prototype, methods);

    command.prototype.constructor = command;

    return command;
};

module.exports = prototype;

