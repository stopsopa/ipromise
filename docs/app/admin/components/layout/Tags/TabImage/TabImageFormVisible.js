
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

import TabImageForm from './TabImageForm';

import * as actions from "../../../../_redux/actions";

import {
    IMAGES_SAVED_TRUE,
    IMAGES_SAVED_FALSE
} from '../../../../_redux/actions/types';

import {
    getImagesEdit,
    getImagesFormError,
    getLoading,
    getImagesSavedFlag
} from '../../../../_redux/reducers';

const buildLoad = (dispatch, {
    id
}) => Promise.all([
    dispatch(actions.imagesEditRequest(id))
]);

class TabImageFormVisible extends Component {
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
                    <TabImageForm
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
    form: getImagesEdit(state),
    errors: getImagesFormError(state),
    loading: getLoading(state),
    saved: getImagesSavedFlag(state)
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
        return dispatch({type: IMAGES_SAVED_TRUE});
    },
    editField(key, value) {

        dispatch({type: IMAGES_SAVED_FALSE});

        return dispatch(actions.imagesEditField(key, value));
    },
    onSubmit(data, file) {

        const promise = dispatch(actions.imagesEditSave(data, file, activateTabByName))

        promise.then(() => dispatch({type:IMAGES_SAVED_TRUE}))

        return promise;
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TabImageFormVisible);
