
import React, { Component, Fragment } from 'react';

import { withRouter } from 'react-router';

import { connect } from 'react-redux';

import './Page.scss';

// import PageLevelRenderer from '../../admin/pages/pages/Tree/PageLevelRenderer';

import {
    getSlug,
    getPage,
} from "../_redux/reducers";

import ErrorBoundary from 'ErrorBoundary';

import * as actions from '../_redux/actions';

// import ssr from '../../admin/pages/pages/Tree/types/Tree/ssr';

import node from 'detect-node';

import routerLifecycle from 'roderic/libs/react/routerLifecycle';

const buildLoad = (dispatch, params, getParameters) => {

    let store = false;

    if (dispatch && typeof dispatch.dispatch === 'function') {

        store       = dispatch;

        dispatch    = store.dispatch;
    }

    const {
        lang,
        slug,
    } = params;

    return Promise.all([
        dispatch(actions.pageRequest(lang, slug))
            // .then(page => {
            //
            //     // node || log('page', JSON.stringify(page, null, 4));
            //
            //     return page;
            // })
            // .then(page => ssr(store, page, params, getParameters))
    ]);
};

class Page extends Component {
    constructor(...args) {

        super(...args);

        this.state = {
            slug: false,
            list: [],
            menu: [],
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

        (  ( this.props.page === false ) || action === 'PUSH' ) && this.getData();
    }
    componentWillUnmount() {
        this.revertMeta();

        this.props.reset();
    }
    onAdd = name => {
        this.setState(state => {
            return {
                [name]: state[name].concat(['Lorem ipsum...', 'amet...']),
            }
        })
    }
    revertMeta = () => {

        if (this.title) {

            document.title = this.title;

            this.title = false;
        }
    }
    render () {

        const {
            match: {
                params: {
                    lang,
                    slug,
                }
            },
            page,
            staticContext = {},
        } = this.props;

        const {
            list,
            menu,
        } = this.state;

        if (page) {

            if (node) {

                // log('node mode')

                if (page.metaTitle) {

                    staticContext.title = page.metaTitle;
                }

                if (page.metaDesc) {

                    staticContext.description = page.metaDesc;
                }
            }
            else {

                // log('web mode', page, document.title, 'page.metaTitle', page.metaTitle, !!page.metaTitle);

                if (page.metaTitle) {

                    if ( ! this.title ) {

                        this.title = document.title;
                    }

                    document.title = page.metaTitle;
                }
                else {

                    this.revertMeta();
                }
            }
        }

        if ( ! this.props.page ) {

            if ( node ) {

                staticContext && (staticContext.status = 404);
            }
            else {

                if (window.responsestatuscode == 404 && window.responsestatusurl === location.pathname) {
                    return (
                        <ErrorBoundary>
                            <div className="g-s rel">
                                <div className="center notfound">
                                    <h1>404 Error</h1>
                                    <p>Page Not Found</p>
                                </div>
                            </div>
                        </ErrorBoundary>
                    );
                }
            }

            return (
                <ErrorBoundary>
                    <div className="g-s rel">
                        <div className="center loader">
                            <h2>Loading...</h2>
                        </div>
                    </div>
                </ErrorBoundary>
            );
        }

        return (
            <ErrorBoundary>
                <div className="main-page g-s" dangerouslySetInnerHTML={{ __html: `lang: "${lang}" slug: "${slug}"` }}/>
                <hr/>
                CONTENT
                <button onClick={e => this.onAdd('list')}>add</button>
                {list.map((l, i) => (
                    <p key={i}>{l}</p>
                ))}
            </ErrorBoundary>
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
        slug:   getSlug(state),
        page:   getPage(state),
    });
};

const mapDispatchToProps = (dispatch, { match, history }) => ({
    load(params = {}) {

        try {
            params = {...params, ...match.params};
        }catch(e) {}

        return buildLoad(dispatch, params);
    },
    reset() {
        // return dispatch(actions.pagesReset())
    }
});

export default routerLifecycle(withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Page)));


