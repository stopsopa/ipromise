
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';

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

import TabResourceForm from './TabResourceForm';

import * as actions from "../../../../_redux/actions";

import {
    RESOURCES_SAVED_TRUE,
    RESOURCES_SAVED_FALSE
} from '../../../../_redux/actions/types';

import {
    getResourcesEdit,
    getResourcesFormError,
    getLoading,
    getResourcesSavedFlag
} from '../../../../_redux/reducers';

const buildLoad = (dispatch, {
    id
}) => Promise.all([
    dispatch(actions.resourcesEditRequest(id))
]);

class TabResourceFormVisible extends Component {
    constructor(...args) {

        super(...args);

        this.state = {
            file: null
        }
    }
    static propTypes = {
        id: PropTypes.oneOfType([
            PropTypes.oneOf([false]),
            PropTypes.number
        ])
    }
    getData = () => {

        if (this.props.id) {

            this.props.savedOn();
        }

        if ( this.props.id || this.props.saved ) {

            this.props.load(this.props.id)
        }
    }
    componentDidMount = () => {

        return this.getData();

        // const { history: { action }, form } = this.props;
        //
        // (  ( form === false ) || action === 'PUSH' ) && this.getData();
    }
    setFile = (file, e) => {

        this.setState({file});

        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
    }
    onDrop = files => this.setFile(files[0]);
    render() {

        const loading = (this.props.form === false);

        return (
            <Tab.Pane loading={loading}>
                {loading ? null :
                    <TabResourceForm
                        {...this.props}
                        onDrop={this.onDrop}
                        file={this.state.file}
                        dropzoneCancel={e => this.setFile(null, e)}
                    />
                }
            </Tab.Pane>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    form: getResourcesEdit(state),
    errors: getResourcesFormError(state),
    loading: getLoading(state),
    saved: getResourcesSavedFlag(state)
});

const mapDispatchToProps = (dispatch, { match, activateTabByName }) => ({
    load(id) {

        let params = {};

        try {
            params = {...params, ...match.params};
        }catch(e) {}

        params.id = id;

        return buildLoad(dispatch, params);
    },
    savedOn() {
        return dispatch({type: RESOURCES_SAVED_TRUE});
    },
    editField(key, value) {

        dispatch({type: RESOURCES_SAVED_FALSE});

        return dispatch(actions.resourcesEditField(key, value));
    },
    onSubmit(data, file) {

        const promise = dispatch(actions.resourcesEditSave(data, file, activateTabByName))

        promise.then(() => dispatch({type:RESOURCES_SAVED_TRUE}))

        return promise;
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TabResourceFormVisible);
