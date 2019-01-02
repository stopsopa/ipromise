
import { Router } from 'express';

export default (...args) => {

    const router = Router();

    router.all('', async (req, res) => res.json({
        page: {
            query: req.query,
        }
    }));

    return router;
}