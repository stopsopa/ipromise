
import React from 'react';

import { Provider } from 'react-redux';

import { ConnectedRouter as Router, routerReducer, routerMiddleware, push } from 'react-router-redux';

import PropTypes from 'prop-types';

import history from 'roderic/libs/history';

// import 'bootstrap/dist/css/bootstrap.css'; // it works
// import 'bootstrap/scss/bootstrap.scss'; // it works too

import Root from './Root';

import 'normalize-css';

import '../styles/admin.scss';

import 'semantic-ui-css/semantic.min.css';

import 'roderic/libs/react/tinymce/tinymce-custom.css';

const RootWeb = ({
    store,
    location
}) => (
    <Provider store={store}>
        <Router history={history}>
            <Root action={location} />
        </Router>
    </Provider>
);

RootWeb.propTypes = {
    store: PropTypes.object.isRequired
}

export default RootWeb;