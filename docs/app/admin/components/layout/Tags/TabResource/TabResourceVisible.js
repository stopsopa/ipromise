
import React, { Component } from 'react';

import { connect } from 'react-redux'

import PropTypes from 'prop-types';

import {
    Breadcrumb,
    List,
    Button,
    Icon,
    Popup,
    Modal,
    Header,
    Loader,
    Message,
    Tab
} from 'semantic-ui-react';

import {
    getResources,
    getResourceById,
    getLoading,
} from '../../../../_redux/reducers';

import TabResource from './TabResource';

import * as actions from "../../../../_redux/actions";

const buildLoad = (dispatch, {
    id
}) => Promise.all([
    dispatch(actions.resourcesRequest())
]);

class TabResourceVisible extends Component {
    constructor(...args) {

        super(...args);

        this.state = {
            deleting: false
        }
    }
    static propTypes = {
        edit: PropTypes.func.isRequired
    }
    static fetchData = (store, routerParams) => {

        let params = {};

        try {
            params = routerParams.params;
        }catch(e) {}

        return buildLoad(store.dispatch, params);
    }
    getData = () => this.props.load()
    componentDidMount = () => {

        // const { history: { action } } = this.props;
        //
        // (  ( ! this.props.list.length ) || action === 'PUSH' ) && this.getData();

        // ( ! this.props.list.length ) && this.getData();

        this.getData();
    }

    cancelDelete = () => this.setState({deleting:false})
    proposeToDelete = id => this.setState({
        deleting: this.props.getById(id)
    })
    render() {
        return (
            <TabResource
                {...this.props}
                cancelDelete={this.cancelDelete}
                proposeToDelete={this.proposeToDelete}
                deleting={this.state.deleting}
            />
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    list: getResources(state),
    getById: id => getResourceById(state, id),
    loading: getLoading(state)
});

const mapDispatchToProps = (dispatch, { match, edit, history }) => ({
    load(params = {}) {

        try {
            params = {...params, ...match.params};
        }catch(e) {}

        return buildLoad(dispatch, params);
    },
    onCreate() {
        log('redirect to form create')
        // activateByName('images-edit');
        // history.push('/admin/resources/create')
    },
    onEdit(id) {
        edit(id);
        // history.push('/admin/resources/edit/' + id)
    },
    deleteItem(id) {
        dispatch(actions.resourcesDelete(id))
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TabResourceVisible);