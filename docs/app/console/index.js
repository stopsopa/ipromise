
const path                  = require('path');

const fs                    = require('fs');

require("@babel/polyfill");

require('@stopsopa/dotenv-up')(2, true, 'console');

const prototype             = require(path.resolve(__dirname, 'prototype'));

const commandsdirectory     = path.resolve(__dirname, 'commands');

function isObject(a) {
    return (!!a) && (a.constructor === Object);
};

// https://i.imgur.com/mWzuQWP.png
const color = (function (c) {
    return (...args) => c[args.pop()] + args.join('') + c.reset;
}({
    Bright      : "\x1b[1m",
    Dim         : "\x1b[2m",
    Underscore  : "\x1b[4m",
    Blink       : "\x1b[5m",
    Reverse     : "\x1b[7m",
    Hidden      : "\x1b[8m",
    FgBlack     : "\x1b[30m",
    FgRed       : "\x1b[31m", // red
    FgGreen     : "\x1b[32m", // green
    FgYellow    : "\x1b[33m", // yellow
    FgBlue      : "\x1b[34m",
    FgMagenta   : "\x1b[35m", // magenta
    FgCyan      : "\x1b[36m", // cyan
    FgWhite     : "\x1b[37m",
    BgBlack     : "\x1b[40m",
    BgRed       : "\x1b[41m",
    BgGreen     : "\x1b[42m",
    BgYellow    : "\x1b[43m",
    BgBlue      : "\x1b[44m",
    BgMagenta   : "\x1b[45m",
    BgCyan      : "\x1b[46m",
    BgWhite     : "\x1b[47m",
    r           : "\x1b[31m", // red
    g           : "\x1b[32m", // green
    y           : "\x1b[33m", // yellow
    m           : "\x1b[35m", // magenta
    c           : "\x1b[36m", // cyan
    reset       : "\x1b[0m",
}));

const c = (...args) => process.stdout.write(color(...args));


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

                try {

                    obj[tmp].push(a);
                }
                catch (e) {

                }
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

            // delete data['config'];
            //
            // delete data['dump'];
            //
            // delete data['help'];
            //
            // delete data['inject'];

            obj = data;
        }
    };
}({}));

function error(msg) {

    process.stderr.write(msg + "\n");

    process.exit(1);
}

function createCommandAbsolute(commandrequire, ...args) {

    if ( ! fs.existsSync(commandrequire) ) {

        error(`Command ERROR: script '${commandrequire}' doesn't exist`);
    }

    let command = require(commandrequire);

    if ( ! isObject(command) ) {

        error(`Command ERROR: '${commandrequire}' should export an object`);
    }

    command = prototype.extend(command);

    if (typeof command !== 'function') {

        error(`Command ERROR: '${commandrequire}' after extending is not a function`);
    }

    return [new command(...args), commandrequire];
}

function createCommand(command, ...args) {

    const commandrequire = path.resolve(commandsdirectory, command + '.command.js');

    return createCommandAbsolute(commandrequire, ...args);
}

function isolateMethod(command, method, commandrequire) {

    if (Array.isArray(command.publicMethods) && typeof method === 'string' && method) {

        if (command.publicMethods.indexOf(method) > -1) {

            if ( typeof command[method] !== 'function') {

                error(`Command ERROR: method name '${method}' is registered as an public method but there is no such method`);
            }

            return command[method];
        }

        error(`Command ERROR: method '${method}' doesn't exist in '${commandrequire}'`);
    }
    else if (typeof command.execute !== 'function') {

        error(`Command ERROR: method '${method}' in '${commandrequire}' is not a function`);
    }

    return command.execute;
}


const listFilesSync = (dir, l = 0) => {

    let pa, s;

    let list = [];

    fs.readdirSync(dir).forEach(p => {

        pa  = path.resolve(dir, p);

        s   = fs.lstatSync(pa);

        // console.log('file: ', s.isFile() ? 'F' : 'D', ': ', ' '.repeat(l),  p);

        if (s.isFile()) {

            list.push(['f', pa]);
        }

        if (s.isDirectory()) {

            list.push(['d', pa]);

            list = list.concat(listFilesSync(pa, l + 4));
        }
    })

    return list;
};

(async function () {

    const log   = require('inspc');

    const getTools = () => ({
        log,
        color,
        c,
    })

    let command = (process.argv[2] && process.argv[2].indexOf('--') !== 0) ? process.argv[2] : false;

    let method  = (command && process.argv[3] && process.argv[3].indexOf('--') !== 0) ? process.argv[3] : false;

    let help    = args.get('help', false);

    if (Object.keys(process.argv).length < 3) {

        help = true;
    }

    let run;

    if (command) {

        if (help) {

            method = 'help';
        }

        command         = createCommand(command, args, getTools());

        commandrequire  = command[1];

        command         = command[0];

        run             = isolateMethod(command, method, commandrequire);
    }
    else {

        const sufix     = '.command.js';
        const suflen    = sufix.length;

        const commands = listFilesSync(commandsdirectory)
            .filter(([type, file]) => (type === 'f' && (file.indexOf(sufix) == (file.length - suflen))))
            .map(f => f[1])
            .map(file => {
                const tmp = file.substring(commandsdirectory.length + 1);
                const [cls] = createCommandAbsolute(file);
                return {
                    name    : tmp.substring(0, (tmp.length - suflen)),
                    cls,
                    info    : cls.description(),
                }
            })
        ;

        const max = commands.reduce((acc, v) => {
            const l = v.name.length;
            if (l > acc) {

                return l;
            }
            return acc;
        }, 0);

        const list = commands.map(v => {
            v.name = v.name.padEnd(max + 4, ' ');
            return v;
        }).map(v => `${color(v.name, 'g')}: ${color(v.info, 'c')}`).join("\n")

        process.stdout.write(`
${color('Usage:', 'y')}
 
    ${color('/bin/bash console.sh --help', 'y')}
        this help page
        
    ${color('/bin/bash console.sh [command]', 'y')}
        executing single command
        
    ${color('/bin/bash console.sh [command] [arguments]', 'y')}
        executing command with arguments, example
            ${color('/bin/bash console.sh runcommand --flag arg1 --otherparam paramvalue1 paramvalue2', 'y')}
 
    You can try to get help from individual commands using '--help' arguments like: 
        ${color('/bin/bash console.sh [command] --help', 'y')}
        
There is another special command to build modules with import export  
    ${color('/bin/bash console.sh --build', 'y')}        
            
${color('List of available commands:', 'y')}
${list} 
      
`);
        process.exit(0);
    }

    try {

        const code = await run.call(command, args, getTools());

        if (Number.isInteger(code)) {

            process.exit(code);
        }
        else {

            process.stdout.write(`\n--------------------\nCommand WARNING: \n\n    method 'execute' should return integer (normally or through promise) that is normally used as an exit code returned to operating system, in this case it was: '` + (typeof code) + `'\n\n    exit code is 0 then\n\n`);
        }
    }
    catch (e) {

        process.stderr.write(`Command CRASHED, message:\n`);

        // console.log(typeof log.dump)
        //
        // process.exit(0);

        log.dump({
            command_error: e
        });

        process.exit(1);
    }

}());