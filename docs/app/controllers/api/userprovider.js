
import { Router } from 'express';

import knex from '@stopsopa/knex-abstract';

export default (...args) => {

    const router = Router();

    router.use(async (req, res) => {

        // req.body
        // {
        //     "username": "username",
        //     "password": "pass",
        //     "role": "admin",
        //     "jwt_secret": "secret..."
        // }

        let user        = false;

        let error       = false;

        const username  = req.body.username;

        const password  = req.body.password;

        const role      = req.body.role;

        if (username) {

            if (role) {

                try {

                    user = await knex().model.users.queryOne(`
SELECT          u.*, GROUP_CONCAT(rr.name) roles
FROM            :table: u 
INNER JOIN      user_role ur
             ON ur.user_id = u.id
INNER JOIN      roles r
             ON ur.role_id = r.id
             

INNER JOIN      user_role urr
             ON urr.user_id = u.id            
INNER JOIN      roles rr
             ON urr.role_id = rr.id
             
WHERE           u.email = :username
            AND r.name = :role
GROUP BY        u.id
`, {
                        username,
                        role
                    });

                    if ( user ) {

                        if (user.password !== password) {

                            user = null;

                            error = `Incorrect password (user: '${username}') ...`;
                        }

                        if ( ! user.enabled ) {

                            user = null;

                            error = `User is not active (user: '${username}') ...`;
                        }
                    }
                    else {

                        error = `user '${username}' not found`;
                    }

                }
                catch (e) {

                    log.t('userprovider: query error');

                    log.dump(e, 4);

                    return res.jsonError('Server error');
                }
            }
            else {

                error = 'role not specified';
            }
        }
        else {

            error = `username not specified`;
        }

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
        //             // body: req.body,
        //         },
        //         error: false,
        //     }));
        // }

        if (user) {

            delete user.password;
        }

        return res.jsonNoCache({
            user,
            error,
        });
    });

    return router;
}
