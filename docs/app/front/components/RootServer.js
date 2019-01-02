
import React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter as Router, Route } from 'react-router'
import PropTypes from 'prop-types';

import Root from './Root';

const RootServer = ({
    store,
    location,
    context
}) => (
    <Provider store={store}>
        <Router location={location} context={context}>
            <Root action={location} />
        </Router>
    </Provider>
);

RootServer.propTypes = {
    store       : PropTypes.object.isRequired,
    location    : PropTypes.string.isRequired,
    context     : PropTypes.object.isRequired
}

export default RootServer;