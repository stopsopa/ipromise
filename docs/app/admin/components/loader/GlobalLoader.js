
import React, { Component } from 'react';

import './GlobalLoader.scss';

import { Segment, Loader, Dimmer } from 'semantic-ui-react'

import classnames from 'classnames';

let visible = undefined;

class GlobalLoader extends Component {
    componentWillMount() {

        const {
            loaderButtonsShow,
            loaderButtonsHide
        } = this.props;

        this.event = e => {
            if (e.keyCode === 192) {
                visible ? loaderButtonsHide() : loaderButtonsShow();
            }
        };

        try {
            document.addEventListener('keydown', this.event, true);
        } catch (e) {}
    }
    componentWillUnmount() {
        try {
            document && document.removeEventListener('keydown', this.event, true);
        } catch (e) {}
    }
    componentWillUpdate(nextProps, nextState) {
        visible = nextProps.buttonsVisible;
    }
    render() {

        const { status, msg } = this.props;

        if ( status === 'off' ) {

            return null;
        }

        if ( status === 'err' || status === 'msg' ) {

            return (
                <div className={classnames(
                    'global-loader-component',
                    status
                )}>
                    <span>{msg}</span>
                </div>
            );
        }

        return (
            <div className="global-loader-component load">
                {/*<Loader size='mini' active inline />*/}
                <span>Loading ...</span>
            </div>
        );
    }
}


export default GlobalLoader;

