
import { Router } from 'express';

import userprovider from './userprovider';

import jwttokenprovider from './jwttokenprovider';

import admin from './admin';

import front from '../../front/controllers';

export default (...args) => {

    const router = Router();

    router.all('/userprovider', userprovider(...args));

    router.all('/jwttokenprovider', jwttokenprovider(...args));
    //
    router.use('/admin', admin(...args));

    router.use('', front(...args));

    router.use((req, res) => {

        // https://expressjs.com/en/guide/routing.html#express-router
        res.statusCode = 500;

        res.end(`Url '${req.url}' don't match any api router`);
    });

    return router;
}