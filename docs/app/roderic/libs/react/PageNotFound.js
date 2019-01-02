
import React, { Component } from 'react';

import Dashboard from '../../../admin/pages/Dashboard';

import { Route, withRouter } from 'react-router';

import {
    Message
} from 'semantic-ui-react';

class PageNotFound extends Component {
    render() {

        const {
            location,
            staticContext
        } = this.props;

        staticContext && (staticContext.status = 404);

        return (
            <Dashboard>
                <Message negative>
                    <Message.Header>Page not found (404) - for url "{location.pathname}"</Message.Header>
                </Message>
            </Dashboard>
        );
    }
}

export default withRouter(PageNotFound);