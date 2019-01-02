
import React, { Fragment } from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';

import routes from '../routes';

import LayoutBase from './layout/LayoutBase';

import LoginFormVisible from './auth/LoginFormVisible';

import NotificationVisible from './notifications/NotificationVisible';

import GlobalLoaderVisible from './loader/GlobalLoaderVisible';

const Root = ({
    action
}) => {
    return (
        <Fragment>
            <GlobalLoaderVisible/>
            <LoginFormVisible
                role="admin"
                action={action}
                pathAfterSignOut="/admin"
                timeLeftMessageSecIfLessThan={(60 * 10)} // 10 minutes
                // childComponent={LoginForm2} // it is possible to override child component here
            >
                <LayoutBase
                    pathAfterSignOut="/admin"
                >
                    <Switch>
                        {routes.map((route, i) => <Route key={i} {...route} />)}
                    </Switch>
                </LayoutBase>
            </LoginFormVisible>
            <NotificationVisible/>
        </Fragment>
    );
};

export default Root;
