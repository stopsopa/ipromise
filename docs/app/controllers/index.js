
import { Router } from 'express';

import api from './api';

import configPublic from "public.config";

import jwttokendiff from "./api/jwttokendiff";

import jwttokenrefresh from "./api/jwttokenrefresh";

export default (...args) => {

    const router = Router();

    router.use((req, res, next) => {
        process.stdout.write(
            (new Date()).toISOString().substring(0, 19).replace('T', ' ') +
            " " +
            req.method.toUpperCase().padEnd(4, ' ') +
            ":" +
            req.url +
            "\n"
        );
        next();
    });

    try {
        if (typeof configPublic.jwt.remote['jwttoken'+'diff'] === 'string') {

            if (configPublic.jwt.remote['jwttoken'+'diff'][0] === '/') {

                router.all(configPublic.jwt.remote['jwttoken'+'diff'], jwttokendiff(...args));
            }
            else {

                throw `configPublic.jwt.remote.jwttoken`+`diff[0] === '/' is not true`
            }
        }
    }
    catch (e) {}

    try {
        if (typeof configPublic.jwt.remote['jwttoken'+'refresh'] === 'string') {

            if (configPublic.jwt.remote['jwttoken'+'refresh'][0] === '/') {

                router.all(configPublic.jwt.remote['jwttoken'+'refresh'], jwttokenrefresh(...args));
            }
            else {

                throw `configPublic.jwt.remote.jwttoken`+`refresh[0] === '/' is not true`
            }
        }
    }
    catch (e) {}

    /// to test open: http://forbeslindesay.github.io/express-route-tester/

    // paste in Route >>>:bbb((/app_dev.php)|)/ccc/:ddd/eee<<<  (end flag - off)
    // and to Path >>>/ccc/ddd/eee<<< or >>>/app_dev.php/ccc/ddd/eee<<<

    // paste also in route >>>:bbb((/app_dev.php)|)<<<  (end flag - off)
    // and see against Path >>>/ccc<<< or >>>/ccc/ddd/eee<<<

    // Route >>>:bbb((/app_dev.php)|)/s/:key<<<  (end flag - off)
    // Path >>>/app_dev.php/s/value/eee<<< or >>>/s/value/eee<<<

    // Route >>>:bbb((/app_dev.php)|)/s/:key(*)<<<   (end flag - on)
    // Path >>>/app_dev.php/s/value/df<<< and >>>/s/value/df<<<

    // the result is this:
    // router.use(':app_dev((/app_dev.php)|)', (req, res, next, ...rest) => {
    //     res.end(`finally match: '${req.url}' rest: ` + JSON.stringify(req.params, null, 4).replace('{', ''));
    // })
    // create express.Router middleware: https://expressjs.com/en/guide/routing.html#express-router

    router.use('/api', api(...args));

    // return router;

    return (function (r) {

        r.use(':app_dev((/app_dev.php)|)', router);

        return r;
    }(Router()));
}


// req.body
// {
//     "username": "username",
//     "password": "pass",
//     "role": "admin",
//     "jwt_secret": "secret..."
// }


// https://expressjs.com/en/guide/routing.html#express-router
// res.statusCode = 500;