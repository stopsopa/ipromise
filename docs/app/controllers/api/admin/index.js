
import { Router } from 'express';

// import userprovider from './userprovider';
//
// import jwttokenprovider from './jwttokenprovider';

export default (...args) => {

    const router = Router();

    router.all('/users', (req, res) => res.end('users'));
    //
    // router.all('/jwttokenprovider', jwttokenprovider(...args));

    // router.all(/^(\/app_dev\.php)?/, (req, res) => {
    //     res.end(`.... ${req.url}`)
    // })

    // router.use((req, res) => {
    //
    //     // https://expressjs.com/en/guide/routing.html#express-router
    //     // res.statusCode = 500;
    //
    //     res.end(`**Url '${req.url}' don't match any admin router`);
    // });

    return router;
}