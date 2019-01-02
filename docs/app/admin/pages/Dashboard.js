
import React, { Component } from 'react';

import LayoutPadding from '../components/layout/LayoutPadding';

class Dashboard extends Component {
    // static fetchData = (store, routerParams) => {
    //     return Promise.resolve()
    // }
    render () {

        const list = [];

        const { location } = this.props;

        if (this.props.children) {

            list.push(
                <LayoutPadding key="alert">
                    {this.props.children}
                </LayoutPadding>
            );
        }

        list.push(
            <LayoutPadding key="dashboard" data-test="dashboard-box">
                <div>Dashboard...</div>
            </LayoutPadding>
        );

        return list;
    }
}

export default Dashboard;




