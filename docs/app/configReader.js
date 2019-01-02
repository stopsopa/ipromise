/**
 * node configReader.js --file ./config --param hub.port
 * node configReader.js --file ./config
 */

const log = console.log;

const args = (function (obj, tmp) {
    process.argv
        .slice(2)
        .map(a => {

            if (a.indexOf('--') === 0) {

                tmp = a.substring(2).replace(/^\s*(\S*(\s+\S+)*)\s*$/, '$1');

                if (tmp) {

                    obj[tmp] = (typeof obj[tmp] === 'undefined') ? true : obj[tmp];
                }

                return;
            }

            if (a === 'true') {

                a = true
            }

            if (a === 'false') {

                a = false
            }

            if (tmp !== null) {

                if (obj[tmp] === true) {

                    return obj[tmp] = [a];
                }

                obj[tmp].push(a);
            }
        })
    ;

    Object.keys(obj).map(k => {
        (obj[k] !== true && obj[k].length === 1) && (obj[k] = obj[k][0]);
        (obj[k] === 'false') && (obj[k] = false);
    });

    return {
        all: () => JSON.parse(JSON.stringify(obj)),
        get: (key, def) => {

            var t = JSON.parse(JSON.stringify(obj));

            if (typeof def === 'undefined')

                return t[key];

            return (typeof t[key] === 'undefined') ? def : t[key] ;
        },
        update: data => {

            delete data['config'];

            delete data['dump'];

            delete data['help'];

            delete data['inject'];

            obj = data;
        }
    };
}({}));

const file = args.get('file');

if ( ! file ) {

    throw "--file parameter not specified";
}

const config = require(file);

// // https://nodejs.org/docs/latest/api/all.html#modules_accessing_the_main_module
if (require.main === module) {

    function isObject(a) {
        return ['[object Object]',"[object Array]"].indexOf(Object.prototype.toString.call(a)) > -1;
    };

    let tmp = config;

    const a = args.get('param');

    if (a !== true && typeof a !== 'undefined') {

        const key = a.split('.');
        let k;
        while (k = key.shift()) {

            tmp = tmp[k];
        }
    }

    if (isObject(tmp)) {

        process.stdout.write(JSON.stringify(tmp, null, '    '));
    }
    else {

        process.stdout.write(tmp + '');
    }

}
else {

    module.exports = config;
}