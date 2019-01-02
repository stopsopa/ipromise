
import React, { Component } from 'react';

import { connect } from 'react-redux'

import UserList from './UserList';

import * as actions from "../../_redux/actions";

import {
    getUsers,
    getUserById,
    getLoading
} from '../../_redux/reducers';

class UserListVisible extends Component {
    constructor(...args) {
        super(...args)
        this.state = {
            deleting: false
        };
    }
    static fetchData = (store, routerParams) => {
        return Promise.all([
            store.dispatch(actions.usersRequest())
        ]);
    }
    getData = () => {
        this.props.usersRequest();
    }
    componentDidMount() {

        const { history: { action } } = this.props;

        (  ( this.props.list === false ) || action === 'PUSH' ) && this.getData();
    }

    cancelDelete = () => this.setState({deleting:false})
    proposeToDelete = id => this.setState({
        deleting: this.props.getById(id)
    })

    render() {
        return (
            <UserList
                {...this.props}
                cancelDelete={this.cancelDelete}
                proposeToDelete={this.proposeToDelete}
                deleting={this.state.deleting}
            />
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    list: getUsers(state),
    loading: getLoading(state),
    getById: id => getUserById(state, id)
});

const mapDispatchToProps = (dispatch, { match, history }) => ({
    usersRequest() {
        dispatch(actions.usersRequest())
    },
    onCreate() {
        history.push('/admin/users/create')
    },
    onEdit(id) {
        history.push('/admin/users/edit/' + id)
    },
    deleteItem(id) {
        dispatch(actions.usersDelete(id))
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserListVisible);