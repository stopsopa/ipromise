
import { Router } from 'express';

import page from './page';

import main from './main';

// import testKnex from '../../models/mysql/test';

export default (...args) => {

    const router = Router();

    // router.use(testKnex); // available under: /api/admin

    router.use('/page', page(...args));

    router.use('/main', main(...args));

    return router;
}