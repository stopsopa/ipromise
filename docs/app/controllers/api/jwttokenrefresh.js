
import { Router } from 'express';

import configServer from "server.config";

import jwtCookie from 'roderic/libs/jwtCookie';

import jwt from 'jsonwebtoken';

export default (...args) => {

    const router = Router();

    const secret    = configServer.jwt.jwt_secret;

    const expire    = configServer.jwt.jwt_expire;

    router.use((req, res) => {

        res.set('Content-Type', 'application/json; charset=utf-8');

        let cookieJWTTwoDotsToken   = req.get('x-jwt') || jwtCookie(req, res).get() || false;

        try {

            // expecting exception from method .verify() if not valid:
            // https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
            jwt.verify(cookieJWTTwoDotsToken, secret);
        }
        catch (e) { // auth based on cookie failed (any reason)

            return res.json({
                diffInSec: false,
                error: e + '',
                jwt: null,
            });
        }

        let raw = jwt.decode(cookieJWTTwoDotsToken);

        let { exp, iat, ...payload } = raw; // remove exp & iat

        const newCookieJWTTwoDotsToken = jwt.sign(
            payload,
            secret,
            {
                // https://github.com/auth0/node-jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback
                // must be int
                expiresIn: parseInt(expire, 10)
            }
        );

        jwtCookie(req, res).set(newCookieJWTTwoDotsToken);

        payload = jwt.decode(newCookieJWTTwoDotsToken); // decode to get new exp

        res.json({
            jwt     : newCookieJWTTwoDotsToken,
            error   : false,
            diffInSec: parseInt(payload.exp - ((new Date()).getTime() / 1000), 10),
        });
    });

    return router;
}
