
import React, { Component } from 'react';

import { connect } from 'react-redux';

import Notification from './Notification';

import * as actions from "../../_redux/actions";

import {
    getNotificationState
} from '../../_redux/reducers';

import {
    notificationRemove
} from './notification-actions';

const mapStateToProps = (state, ownProps) => ({
    list: getNotificationState(state)
});

const mapDispatchToProps = {
    remove: notificationRemove
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Notification);

