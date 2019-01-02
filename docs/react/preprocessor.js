/**
 * Copy this file to your project
 */

/**
 * Script that is executed before webpack build start
 */

const path                  = require('path');

const fs                    = require('fs');

require('colors');

const log                   = require('inspc');

const yaml                  = require('roderic/webpack/yaml');

require('@stopsopa/dotenv-up')(3, false, 'preprocessor.js');

const dotenv                = require('roderic/webpack/dotenv');

const config                = require('./config');

module.exports = opt => {

    process.stdout.write(`
     ____           _           _      
    |  _ \\ ___   __| | ___ _ __(_) ___ 
    | |_) / _ \\ / _\` |/ _ \\ '__| |/ __|
    |  _ < (_) | (_| |  __/ |  | | (__ 
    |_| \\_\\___/ \\__,_|\\___|_|  |_|\\___|

    `.yellow);

    0 && (function () {

        process.stdout.write(`
    
    
    
            =======================================================
            remember about robots.txt after releasing to production
            =======================================================
    
        
        
    `.red);

    }());

    (function () {

        const dotenvfile        = path.resolve(config.root, '.env')

        const targetjsonfile    = path.resolve(config.app, 'preprocessor', 'dotenv.json');

        dotenv.preprocess(dotenvfile, targetjsonfile);

    })();

    /**
     * Extracting Symfony parameters for frontend
     */
    0 && (function () {

        const sf_parameters_yml     = path.resolve(__dirname, '../php/app/config/parameters.yml');

        const sf_parameters         = yaml(sf_parameters_yml);

        let config;

        try {

            config = {
                cookie_name  : sf_parameters.parameters.cookie_name,
                jwt_secret  : sf_parameters.parameters.jwt_secret,
                jwt_expire  : sf_parameters.parameters.jwt_expire,
            }

        }
        catch (e) {

            throw `\n\n\n       Error: Can't load sf_parameters.parameters.cookie_name\n\n\n         Raw error: ${e}\n\n\n`;
        }

        const preprocessorSfParametersFile = path.resolve(__dirname, 'preprocessor/sf_parameters.js');

        if (fs.existsSync(preprocessorSfParametersFile)) {

            fs.unlinkSync(preprocessorSfParametersFile);
        }

        if (fs.existsSync(preprocessorSfParametersFile)) {

            throw `\n\n\n       Error: Can't remove file '${preprocessorSfParametersFile}'\n\n\n`;
        }

        fs.writeFileSync(preprocessorSfParametersFile, `module.exports = ${JSON.stringify(config, null, 4)}`);

        if ( ! fs.existsSync(preprocessorSfParametersFile)) {

            throw `\n\n\n       Error: Can't create file '${preprocessorSfParametersFile}'\n\n\n`;
        }
    }());

    // generating release timestamp for ?_=time parameters of assets
    (function () {

        if ( ! opt.timejs ) {

            throw `preprocessor.js: opt.timejs is not specified`;
        }

        const file = opt.timejs;

        if (fs.existsSync(file)) {

            fs.unlinkSync(file);
        }

        if (fs.existsSync(file)) {

            throw `\n\n\n       Error: Can't remove file '${file}'\n\n\n`;
        }

        if (process.env.NODE_ENV === 'production') {

            const mkdirP = require('roderic/libs/mkdirp');

            const time = (new Date()).toISOString().substring(0, 19).replace('T', '_').replace(/:/g, '-') + '_prod';

            const dir = path.dirname(file);

            if ( ! fs.existsSync(dir) ) {

                mkdirP.sync(dir);
            }

            if ( ! fs.existsSync(dir) ) {

                throw `\n\n\n       Error: Directory '${dir}' doesn't exist and i can't create it\n\n\n`;
            }

            fs.writeFileSync(file, `module.exports = '${time}'`);

            if ( ! fs.existsSync(file)) {

                throw `\n\n\n       Error: Can't create file '${file}'\n\n\n`;
            }
        }

    }());

    if (process.env.NODE_ENV === 'production') {

    }
    else {

    }
}
