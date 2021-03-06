
import React, { Component } from 'react';

import { connect } from 'react-redux'

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

import TabImageVisible from './TabImageVisible';

import TabImageFormVisible from './TabImageFormVisible';

class TabImageListOrEditVisible extends Component {
    constructor(...args) {

        super(...args);

        this.state = {
            id: this.props.id, // false - list, int - edit by id
        }
    }

    /**
     * If in edit mode (edit form visible) then clicking once again on "Resource" tab will load list again
     */
    componentWillUpdate = () => {
        if (this.state.id !== false) {

            this.setState({
                id: this.props.id
            })
        }
    }
    render() {

        if (this.state.id === false) {

            return (
                <TabImageVisible
                    {...this.props}
                    edit={id => this.setState({id})}
                />
            );
        }

        return (
            <TabImageFormVisible
                {...this.props}
                id={this.state.id}
            />
        );
    }
}

export default TabImageListOrEditVisible;