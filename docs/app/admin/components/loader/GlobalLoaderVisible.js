
import React, { Component } from 'react';
import GlobalLoader from './GlobalLoader';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from '../../_redux/actions';

import {
    getLoaderStatus,
    getLoaderMsg,
    getLoaderButtonVisible
} from '../../_redux/reducers';

class GlobalLoaderVisible extends Component {
    static propTypes = {
        status: PropTypes.oneOf([
            'on', 'off', 'err', 'msg'
        ]).isRequired,
        msg: PropTypes.string.isRequired
    }
    render() {

        const { status, msg } = this.props;

        return <GlobalLoader {...this.props} />
    }
}

const mapStateToProps = (state) => {
    return {
        status: getLoaderStatus(state),
        msg: getLoaderMsg(state),
        buttonsVisible: getLoaderButtonVisible(state)
    };
};

export default connect(
    mapStateToProps,
    actions
)(GlobalLoaderVisible);