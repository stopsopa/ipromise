
import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import {
    Icon,
    Button,
    Popup,
    Tab
} from 'semantic-ui-react'

import countdown from 'roderic/libs/react/countdown';

import {
    loginRefreshToken,
} from "../../_redux/actions";

import { fetchJson } from 'transport';

import * as actions from "../../_redux/actions";

export const diffTool = (function () {

    let browserCalculatedExpireTime = false; // normally it's gonna be timestamp

    var k = new Date();

    const tool = {
        setBrowserCalculatedExpireTime: time => browserCalculatedExpireTime = tool.diffFromNowAsTimestamp(time),
        diffFromNowAsTimestamp: (offsetSec = 0) => {

            if ( ! Number.isInteger(offsetSec) ) {

                throw `diffWithNowAsTimestamp: offsetSec is not integer`;
            }

            k.setTime(parseInt(((new Date()).getTime() / 1000) + offsetSec, 10) * 1000);

            return parseInt(k.getTime() / 1000, 10);
        },
        getBrowserCalculatedExpireTimeLeft: () => {

            if (browserCalculatedExpireTime === false) {

                return false;
            }

            return browserCalculatedExpireTime - tool.diffFromNowAsTimestamp();
        }
    };
    return tool;
}());

export const diffSubscriber = (function () {

    let events = [], handler = false;

    const error = (function () {try {return console.error;} catch (e) {}}());

    return {
        subscribe: callback => {

            if (typeof callback !== 'function') {

                return error(`diffSubscriber:subscribe: callback is not a function`);
            }

            if ( ! handler ) {

                const tick = () => {

                    const diff = diffTool.getBrowserCalculatedExpireTimeLeft();

                    events.forEach(callback => callback(diff));
                };

                handler = setInterval(tick, 1000);

                tick();
            }

            events.push(callback);
        },
        unsubscribe: callback => {

            if (typeof callback !== 'function') {

                return error( `diffSubscriber:unsubscribe: callback is not a function`);
            }

            const tmp = [];

            for (var i = 0, l = events.length ; i < l ; i += 1 ) {

                if (events[i] === callback) {

                    tmp.unshift(i);
                }
            }

            tmp.forEach(i => {
                events.splice(i, 1);
            });

            if ( ! events.length ) {

                clearInterval(handler);

                handler = false;
            }
        }
    }
}());

class SessionTime extends Component {
    static defaultProps = {
        loginSignOut    : PropTypes.func.isRequired,
        requestDiff     : PropTypes.func,
    }
    constructor(...args) {
        super(...args);

        this.state = {
            hover   : false,
            diff    : false,
        }
    }
    componentDidMount() {

        const {
            loginSignOut,
            requestDiff,
        } = this.props;

        if (requestDiff) {

            requestDiff().then(diff => {

                diffTool.setBrowserCalculatedExpireTime(diff);

                diffSubscriber.subscribe(this.event = diff => {

                    if (diff < 1) {

                        diffSubscriber.unsubscribe(this.event);

                        this.event = false;

                        return loginSignOut();
                    }

                    this.setState({ diff });
                });
            });
        }
    }
    componentWillUnmount() {
        this.event && diffSubscriber.unsubscribe(this.event);
    }
    render() {

        const {
            onRefreshSession,
            hover,
        } = this.props;

        const {
            diff,
        } = this.state;

        if (diff > 0) {

            return (
                <Fragment>
                    <td>
                        {hover
                            ? <Popup
                                size="mini"
                                trigger={
                                    <Button
                                        onClick={onRefreshSession}
                                        icon size="mini"
                                    >
                                        <Icon inverted color='black' name='refresh' />
                                    </Button>
                                }
                                content='Refresh the session'
                                position='left center'
                                inverted
                            />
                            : `session time: ${countdown(diff)}`
                        }

                    </td>
                    <td>&nbsp;</td>
                    <td>|</td>
                    <td>
                        &nbsp;
                    </td>
                </Fragment>
            );
        }

        return null;
    }
}

const mapStateToProps = state => ({
    // sessionTimeLeftSec: getExpireNotificationTimeLeft(state),
});

const mapDispatchToProps = (dispatch, { match, history, pathAfterSignOut }) => ({
    onRefreshSession() {
        return dispatch(loginRefreshToken());
    },
    loginSignOut() {
        return dispatch(actions.loginSignOut(pathAfterSignOut))
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SessionTime);








