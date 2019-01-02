
import React, { Component, Fragment } from 'react';

import { Route, Switch, Redirect, Link } from "react-router-dom";

// import { Header, TopHeaderController, Footer, FollowUs } from "./";

import routes from "./routes";

export default class LangMainComponent extends Component {
    render() {

        const {
            match,
        } = this.props;

        let path = '';
        let url = '';

        try {

            path = match.path;
        }
        catch (e) {

        }

        try {

            url = match.url;
        }
        catch (e) {

        }

        return (
            <Fragment>
                {/*<TopHeaderController />*/}
                {/*<Header routes={routes} url={url} />*/}
                <Switch>
                    {routes.map((route, i) => (
                        <Route key={i} {...route} path={`${path}${route.path}`} />
                    ))}
                </Switch>
                {/*<FollowUs data={{ title: 'Title', text: 'Text' }} />*/}
                {/*<Footer data={*/}
                    {/*{*/}
                        {/*disclaimer: 'Disclaimer',*/}
                        {/*terms: { label: 'Terms', link: '/' },*/}
                        {/*cookies: { label: 'Cookies', link: '/' }*/}
                    {/*}*/}
                {/*} />*/}
            </Fragment>
        );
    }
}