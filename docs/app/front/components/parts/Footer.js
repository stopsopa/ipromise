
import React, { Component, Fragment } from 'react';

import { withRouter } from 'react-router';

import { connect } from 'react-redux';

import {
    getMainSection,
} from "../../_redux/reducers";

import * as actions from '../../_redux/actions';

const section = 'footer';

const buildLoad = (dispatch, json, getParameters) => {

    let store = false;

    if (dispatch && typeof dispatch.dispatch === 'function') {

        store       = dispatch;

        dispatch    = store.dispatch;
    }

    return Promise.all([
        dispatch(actions.mainRequest({
            section,
            json: {
                ...json,
                ...getParameters
            },
            url     : `/endpoint/main?section=${section}`,
            extract : json => json.page,
        }))
    ]);
};

class Footer extends Component {
    constructor(...args) {

        super(...args);

        this.state = {
            slug: false,
        }
    }
    static fetchData = (store, routerParams, getParameters) => {

        let params = {};

        try {
            params = routerParams.params;
        }catch(e) {}

        // return buildLoad(store.dispatch, params, getParameters);

        return buildLoad(store, params, getParameters);
    }
    getData = () => this.props.load();
    componentDidMount() {

        const { history: { action } } = this.props;

        (  ( ! this.props.data ) || action === 'PUSH' ) && this.getData();
    }
    render () {

        const {
            data,
        } = this.props;

        return (
            <footer>
                {(JSON.stringify(data)||'').replace(/[\{\}"]/g, '')}
            </footer>
        );
    }
}

const mapStateToProps = (state, params) => {

    let lang;

    try {
        lang = params.match.params.lang;
    }
    catch (e) {

    }

    return ({
        data: getMainSection(state, section)
        // slug:   getSlug(state),
        // page:   getPage(state),
    });
};

const mapDispatchToProps = (dispatch, props) => {

    const { match, history } = props;

    return ({
        load(getParameters = {}, params = {}) {

            try {
                params = {...params, ...match.params};
            }catch(e) {}

            return buildLoad(dispatch, params, getParameters, props);
        },
    });
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Footer));


