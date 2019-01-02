
import React, { Component } from 'react';

import { connect } from 'react-redux';

import LoginFormDefault from './LoginForm';

import {
    diffSubscriber,
} from '../layout/SessionTime';

import PropTypes from 'prop-types';

import configPublic from 'public.config';

import { Route, withRouter } from 'react-router';

const isNode = typeof global !== 'undefined' && Object.prototype.toString.call(global.process) === '[object process]';

import {
    loginSignOut,
    loginRefreshToken
} from '../../_redux/actions';

import {
    LOGIN_RESET_FAILURE
} from '../../_redux/actions/types';

import {
    getHasRole,
    getLoading,
    getLoginError,
} from '../../_redux/reducers';

const now = () => parseInt((new Date()).getTime() / 1000, 10);

class LoginFormVisible extends Component {
    static propTypes = {
        role: PropTypes.string.isRequired,
        action: PropTypes.string,
        pathAfterSignOut: PropTypes.string.isRequired,
        authenticated: PropTypes.bool.isRequired,
        loading: PropTypes.bool.isRequired,
        error: PropTypes.string,
        onSignOut: PropTypes.func,
        timeLeftMessageSecIfLessThan: PropTypes.number
        // LoginForm: PropTypes.element
    };
    static defaultProps = {
        timeLeftMessageSecIfLessThan: (60 * 10), // 10 minutes
    }
    constructor(...args) {
        super(...args);

        this.state = {
            loading: false,
            sessionTimeLeftSec: false,
        };
    }
    componentDidMount = () => {
        diffSubscriber.subscribe(this.event = diff => this.setState({
            sessionTimeLeftSec: diff,
        }))
    }
    componentWillUnmount = () => {

        this.event && diffSubscriber.unsubscribe(this.event);

        this.event = false;
    }
    onSubmit = e => {

        setTimeout(() => {

            this.props.onResetErrors();

            this.setState({
                loading: true
            });
        }, 0);

        // e.preventDefault();
    }
    onChange = (e, name) => this.setState({[name]:e.target.value});

    render() {

        let { action } = this.props;

        if (typeof action !== 'string') {
            try {
                action = location.pathname;
            } catch (e) {}
        }

        const {
            staticContext,
            childComponent = LoginFormDefault,
            authenticated
        } = this.props;

        // https://stackoverflow.com/a/15302297
        // still don't have nite solution how to provide 403 though, for now 401 will be enough
        if ( ! authenticated ) {

            if ( ! ( action && /(\?|&)_accept(=|&|$)/.test(action) ) ) {

                staticContext && (staticContext.status = 401);
            }
        }

        const LoginForm = childComponent;

        return (
            <LoginForm
                {...this.props}
                {...this.state}
                onSubmit={this.onSubmit}
                onChange={this.onChange}
                action={action}
                isNode={isNode}
                hiddenName={configPublic.jwt.loginHiddenInput.name}
                hiddenValue={configPublic.jwt.loginHiddenInput.value}
            />
        );
    }
}

const mapStateToProps = (state, {
    role
}) => ({
    authenticated: getHasRole(state, role),
    loading: getLoading(state),
    error: getLoginError(state),
});

const mapDispatchToProps = (dispatch, { match, history, pathAfterSignOut }) => ({
    onSignOut() {
        return dispatch(loginSignOut(pathAfterSignOut));
    },
    onResetErrors() {
        return dispatch({
            type: LOGIN_RESET_FAILURE
        })
    },
    onRefreshSession() {
        return dispatch(loginRefreshToken());
    }
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginFormVisible));