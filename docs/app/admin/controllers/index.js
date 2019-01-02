
import { Router } from 'express';

import jwtCookie from 'roderic/libs/jwtCookie';

import configServer from 'server.config';

import jwt from 'jsonwebtoken';

import users from './users';

import roles from './roles';

// import testKnex from '../../models/mysql/test';

export default (...args) => {

    const router = Router();

    // router.use(testKnex); // available under: /api/admin

    router.use((req, res, next) => {

        const cookie = jwtCookie(req, res);

        const cookieJWTTwoDotsToken = cookie.get();

        if ( ! cookieJWTTwoDotsToken) {

            const msg = `api: req: '${req.url}', JWT token not found in cookies`;

            log.t(msg);

            return res.accessDenied(msg); // unauthorised but don't show error message
        }

        // log.dump(cookieJWTTwoDotsToken)

        try {

            // expecting exception from method .verify() if not valid:
            // https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
            jwt.verify(cookieJWTTwoDotsToken, configServer.jwt.jwt_secret);
        }
        catch (e) { // auth based on cookie failed (any reason)

            cookie.del(); // i don't want to see this token again

            const msg = `api: req: '${req.url}', invalid jwt token: '${e}'`;

            log.t(msg);

            return res.accessDenied(msg);
        }

        // token is valid, prepare to return...
        next();
    }); // available under: /api/admin

    router.use('/users', users(...args));

    router.use('/roles', roles(...args));

    return router;
}