
import { Router } from 'express';

import jwtCookie from 'roderic/libs/jwtCookie';

import trim from 'lodash/trim';

import jwt from 'jsonwebtoken';

import { error } from './jwttokenprovider';

export default (...args) => {

    const router = Router();

    router.use((req, res) => {

        res.set('Content-Type', 'application/json; charset=utf-8');

        let rawJwt         = req.get('x-jwt') || jwtCookie(req, res).get() || false;

        if ( ! trim(rawJwt) ) {

            return error(res, `node controller handler: jwttokenprovider: Couldn't extract jwt token from request`);
        }

        const token =  jwt.decode(rawJwt);

        if ( ! token ) {

            return error(res, `node controller handler: jwttokenprovider: Couldn't decode jwt token`);
        }

        return res.end(JSON.stringify({
            diffInSec : token.exp - parseInt((new Date()).getTime() / 1000, 10),
        }));
    });

    return router;
}
