
module.exports = {
    execute: function (args, {log, color, c}) {

        this.log('console deep')
        this.log.dump(process.env);
        this.log.dump(args.all());
    }
};
