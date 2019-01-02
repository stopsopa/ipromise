
import React, { Fragment } from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';

import all from '../routes';

const { nested: routes } = all;

// import Layout from './layout/Layout';

const Root = ({
    action
}) => {
    return (
        <>
            {/*<Layout*/}
                {/*pathAfterSignOut="/"*/}
            {/*>*/}
                <Switch>
                    {routes.map((route, i) => <Route key={i} {...route} />)}
                </Switch>
            {/*</Layout>*/}
        </>
    );
};

export default Root;
