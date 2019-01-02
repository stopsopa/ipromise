
import React, { Component } from 'react';

import LayoutPadding from 'admin/components/layout/LayoutPadding';

import TinyMce, { TinyMceExtendTest, setSource, defaultData } from 'roderic/libs/react/tinymce/TinyMce';

setSource('/asset/public/tinymce/tinymce.js');

import { fetchJson } from 'transport';

const buildLoad = (dispatch, {
    id
} = {}) => Promise.all([
    // fetchJson('/apiv2/test', {
    //
    // })
]);

export default class Tinymce extends Component {
    constructor() {
        super();
        this.state = {
            on: false,
            value: defaultData
        };
    }
    componentDidMount = () => {

        return this.getData();

        // const { history: { action }, form } = this.props;
        //
        // (  ( form === false ) || action === 'PUSH' ) && this.getData();
    }
    static fetchData = (store, routerParams) => {

        let params = {};

        try {
            params = routerParams.params;
        }catch(e) {}

        return buildLoad(store.dispatch, params);
    }
    getData = () => {

        return buildLoad({});
    }
    render() {
        return (
            <LayoutPadding>
                <table width="100%">
                    <tbody>
                    <tr>
                        <td valign="top" width="50%">
                            <button key="button"
                                    onClick={() => this.setState({on: !this.state.on})}
                            >toggle</button>
                            <button key="bimg"
                                    onClick={() => tinyMCE.execCommand('embed_image_from_gallery', {src:'//i.imgur.com/9ng3PRD.png'})}
                            >add image</button>
                        </td>
                        <td valign="top" width="50%">

                        </td>
                    </tr>
                    <tr>
                        <td valign="top">
                            {this.state.on && <TinyMceExtendTest
                                onEditorChange={value => this.setState({ value })}
                                value={this.state.value}
                            ></TinyMceExtendTest>}
                        </td>
                        <td valign="top" style={{paddingTop: '106px'}}>
                            <p className="tinymce" key="p" dangerouslySetInnerHTML={{__html: this.state.value}} />
                        </td>
                    </tr>
                    </tbody>
                </table>
            </LayoutPadding>
        );
    }
}