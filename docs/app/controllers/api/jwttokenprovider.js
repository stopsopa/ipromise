import {Router} from 'express';

import configServer from "server.config";

import configPublic from "public.config";

import md5 from 'md5';

import isObject from 'lodash/isObject';

import jwt from 'jsonwebtoken';

import jwtCookie from 'roderic/libs/jwtCookie';

export const error = (res, error) => {

    res.statusCode = 403;

    res.end(JSON.stringify({error}))
};

export default (...args) => {

    const router    = Router();

    const secret    = configServer.jwt.jwt_secret;

    const expire    = configServer.jwt.jwt_expire;

    let hash        = false;

    router.use((req, res, next) => {

        res.set('Content-Type', 'application/json; charset=utf-8');

        // if (req.body.username == 'admin' && req.body.password == 'pass') {
        //
        //     return res.end(JSON.stringify({
        //         user: {
        //             "id": 1,
        //             "firstName": "admin",
        //             "lastName": "admin",
        //             "email": req.body.username,
        //             "enabled": true,
        //             "roles": ["admin", "user"],
        //         },
        //         error: false,
        //     }));
        // }

        if ( ! hash ) {

            hash = md5(secret);
        }

        if (req.body.jwt_secret !== hash) {

            return error(res, `node controller handler: jwttokenprovider: no jwt_secret md5 secret found in config`);
        }

        const payload = req.body.payload;

        if ( ! isObject(payload) ) {

            return error(res, `node controller handler: jwttokenprovider: payload should be an object`);
        }

        const twoDotsJWTToken = jwt.sign(
            payload,
            secret,
            {
                // https://github.com/auth0/node-jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback
                // must be int
                expiresIn: parseInt(expire, 10)
            }
        );

        jwtCookie(req, res).set(twoDotsJWTToken);

        // return res.end(JSON.stringify({
        //     test: hash,
        //     s: req.body.jwt_secret,
        //     p: req.body.payload,
        //     i: isObject(payload),
        //     twoDotsJWTToken,
        //     c: configPublic.jwt.postToGetReloadShortcut,
        //     acc: req.get('accept'),
        //     ind: (req.get('accept') || '').toLowerCase().split(',').indexOf('text/html')
        // }));

        res.json({
            'jwt'       : twoDotsJWTToken,
            'decoded'   : jwt.decode(twoDotsJWTToken),
        });
    });

    return router;
}
