
import React, { Component } from 'react';

import { Provider } from 'react-redux';

import { ConnectedRouter as Router, routerReducer, routerMiddleware, push } from 'react-router-redux';

import PropTypes from 'prop-types';

import history from 'roderic/libs/history';

// import 'bootstrap/dist/css/bootstrap.css'; // it works
// import 'bootstrap/scss/bootstrap.scss'; // it works too

import onurlchange from 'roderic/libs/onurlchange';

import Root from './Root';

import 'normalize-css';

// import '../styles/front.scss';

// import 'semantic-ui-css/semantic.min.css';

// import 'roderic/libs/react/tinymce/tinymce-custom.css';

class RootWeb extends Component {
    static propTypes = {
        store: PropTypes.object.isRequired
    }
    componentDidMount() {

        onurlchange(href => {
            log('onurlchange', href)
            try{window.gtagpageview()}catch(e){log('no-gtagpageview')}
        });

        try{

            window.gtagpageview()

        }catch(e){log('no-gtagpageview..', e)}
    }
    render () {

        const {
            store,
            location
        } = this.props;

        return (
            <Provider store={store}>
                <Router history={history}>
                    <Root action={location} />
                </Router>
            </Provider>
        );
    }
}

export default RootWeb;