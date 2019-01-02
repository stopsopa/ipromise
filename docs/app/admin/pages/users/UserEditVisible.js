
import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux'

import { Route } from 'react-router-dom';

import Prompt from 'roderic/libs/react/Prompt';

import UserEdit from './UserEdit';

import {
    Breadcrumb
} from 'semantic-ui-react';

import * as actions from "../../_redux/actions";

import {
    getUsersEdit,
    getUsersFormError,
    getLoading,
    getRoles
} from '../../_redux/reducers';

const buildLoad = (dispatch, {
    id
}) => Promise.all([
    dispatch(actions.usersEditRequest(id)),
    dispatch(actions.rolesRequest())
]);

class UserEditVisible extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
            blocked: false, // form has changes but user didn't save them
            loading: false, // all necessary data are loading from server in order to render complete form
            sending: false // user clicked submit and form is waiting for server response
        }
    }
    static fetchData = (store, routerParams) => {

        let params = {};

        try {
            params = routerParams.params;
        }catch(e) {}

        return buildLoad(store.dispatch, params);
    }
    getData = () => {

        this.setState({
            loading: true
        });

        this.props.load()
            .then(() => this.setState({
                loading: false
            }))
        ;
    }
    editField = (...args) => {
        this.setState({
            blocked:true
        });
        return this.props.editField(...args);
    }
    onSubmit = (...args) => {

        this.setState({
            sending: true
        });

        const promise = this.props.onSubmit(...args);

        promise.then(json => this.setState({
            blocked: !!Object.keys(json.errors || {}).length,
            sending: false
        })).catch(() => this.setState({
            sending: false
        }));

        return promise;
    }
    componentDidMount() {

        const { history: { action }, form } = this.props;

        (  ( form === false ) || action === 'PUSH' ) && this.getData();
    }
    togglePassword = () => this.setState(pState => ({
        showPassword: !pState.showPassword
    }))
    render() {

        const {
            history, form
        } = this.props;

        const breadcrumb = [
            <Breadcrumb.Section key={1} link onClick={() => history.push('/admin/users')}>Users</Breadcrumb.Section>,
            <Breadcrumb.Divider key={2} icon='right chevron'/>
        ]

        if (form !== false) {
            breadcrumb.push(<Breadcrumb.Section key={3}>
                {form.id ? 'Edit' : 'Create'}
            </Breadcrumb.Section>)
        }

        return (
            <Fragment>
                <Prompt
                    when={this.state.blocked}
                    message={location =>
                        `Form contains unsaved data, do you really want to discard changes without saving by navigating to: ${location.pathname} ?`
                    }
                    unloadMessage="Form contains unsaved data..."
                />
                <UserEdit
                    {...this.props}
                    breadcrumb={breadcrumb}
                    showPassword={this.state.showPassword}
                    togglePassword={this.togglePassword}
                    editField={this.editField}
                    onSubmit={this.onSubmit}

                    loading={this.state.loading}
                    sending={this.state.sending}
                />
            </Fragment>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    form: getUsersEdit(state),
    errors: getUsersFormError(state),
    loading: getLoading(state),
    roles: getRoles(state),
});

const mapDispatchToProps = (dispatch, { match }) => ({
    load(params = {}) {

        try {
            params = {...params, ...match.params};
        }catch(e) {}

        return buildLoad(dispatch, params);
    },
    editField(key, value) {
        return dispatch(actions.usersEditField(key, value));
    },
    onSubmit(data) {
        return dispatch(actions.usersEditSave(data))
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserEditVisible);