
import React, { Component } from 'react';

import { connect } from 'react-redux';

import {
    NavLink,
    Link
} from 'react-router-dom';

import * as actions from '../../_redux/actions';

import {
    Icon,
    Button,
    Popup,
} from 'semantic-ui-react'

import Footer from '../parts/Footer';

import {
    getUsername
} from '../../_redux/reducers';

import './Layout.scss';

import debounce from 'lodash/debounce';

import node from 'detect-node';

// const p = el => {
//
//     try {
//
//         let cs = window.getComputedStyle(el, null);
//
//         const t = {
//             w   : el.clientWidth, // - including padding, no border, no margin
//             h   : el.clientHeight, // https://developer.mozilla.org/en-US/docs/Web/API/Element/clientWidth#Example
//             bl  : cs.getPropertyValue('border-left-width'),
//             br  : cs.getPropertyValue('border-right-width'),
//             bt  : cs.getPropertyValue('border-top-width'),
//             bb  : cs.getPropertyValue('border-bottom-width'),
//
//             ml  : cs.getPropertyValue('margin-left'),
//             mr  : cs.getPropertyValue('margin-right'),
//             mt  : cs.getPropertyValue('margin-top'),
//             mb  : cs.getPropertyValue('margin-bottom'),
//
//             pl  : cs.getPropertyValue('padding-left'),
//             pr  : cs.getPropertyValue('padding-right'),
//             pt  : cs.getPropertyValue('padding-top'),
//             pb  : cs.getPropertyValue('padding-bottom')
//         };
//
//         Object.keys(t).forEach(key => {
//             t[key] = parseInt(t[key], 10);
//         });
//
//         return t;
//     }
//     catch (e) {
//
//         log(`couldn't call getComputedStyle`);
//
//         return {};
//     }
// }

// const docH = () => {
//     // https://stackoverflow.com/a/1147768
//
//     const body  = document.body,
//         html    = document.documentElement;
//
//     return Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
// }

const get = key => {
    try {
        return JSON.parse(localStorage.getItem(key));
    }
    catch (e) {}
};

const set = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value, null, '    '));
    }
    catch (e) {}
};

class Layout extends Component {
    constructor(...args) {
        super(...args);

        this.state = {
            list: [],
            menu: [],
        }
    }
    onAdd = name => {
        this.setState(state => {
            return {
                [name]: state[name].concat(['Lorem ipsum...', 'amet...']),
            }
        })
    }
    render() {

        const {
            children,
        } = this.props;

        const {
            list,
            menu,
        } = this.state;

        return (
            <>
                <div className="stretch">
                    <div className="header">
                        header...
                    </div>
                    <div className="main">
                        <div className="left">
                            <ul>
                                <li><NavLink activeClassName="active" to="/en" className="link-homepage" exact={true}>Home</NavLink></li>
                                <li><NavLink activeClassName="active" to="/en/test-page" className="link-en">en</NavLink></li>
                                <li><NavLink activeClassName="active" to="/de/test-page" className="link-de">de</NavLink></li>
                                <li><NavLink activeClassName="active" to="/en/puppeteer" className="link-puppeteer">puppeteer</NavLink></li>
                                <li><NavLink activeClassName="active" to="/pagenotfound" className="link-notfound">page not found</NavLink></li>
                            </ul>
                        </div>
                        <div className="right">
                            {children}
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }
}

const mapStateToProps = state => ({
    // username: getUsername(state)
});

const mapDispatchToProps = (dispatch, { match, edit, history, pathAfterSignOut }) => ({
    // loginSignOut() {
    //     return dispatch(actions.loginSignOut(pathAfterSignOut))
    // },
    // requestDiff() {
    //     return dispatch(actions.requestSessionDiff());
    // }
});

const LayoutContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Layout);

export default LayoutContainer;
