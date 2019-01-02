
import React, { Component } from 'react';

import { connect } from 'react-redux';

import {
    NavLink,
    Link
} from 'react-router-dom';

import * as actions from '../../_redux/actions';

import {
    Icon,
    Button,
    Popup,
    Tab
} from 'semantic-ui-react'

import classnames from 'classnames';

import {
    getUsername
} from '../../_redux/reducers';

import LayoutPadding from './LayoutPadding';

import TabExtended from './Tags/TabExtended';


import TabResourceListOrEditVisible from './Tags/TabResource/TabResourceListOrEditVisible';

import TabResourceFormVisible from './Tags/TabResource/TabResourceFormVisible';


import TabImageListOrEditVisible from './Tags/TabImage/TabImageListOrEditVisible';

import TabImageFormVisible from './Tags/TabImage/TabImageFormVisible';


import debounce from 'lodash/debounce';

import node from 'detect-node';

import SessionTime from './SessionTime';

const p = el => {

    try {

        let cs = window.getComputedStyle(el, null);

        const t = {
            w   : el.clientWidth, // - including padding, no border, no margin
            h   : el.clientHeight, // https://developer.mozilla.org/en-US/docs/Web/API/Element/clientWidth#Example
            bl  : cs.getPropertyValue('border-left-width'),
            br  : cs.getPropertyValue('border-right-width'),
            bt  : cs.getPropertyValue('border-top-width'),
            bb  : cs.getPropertyValue('border-bottom-width'),

            ml  : cs.getPropertyValue('margin-left'),
            mr  : cs.getPropertyValue('margin-right'),
            mt  : cs.getPropertyValue('margin-top'),
            mb  : cs.getPropertyValue('margin-bottom'),

            pl  : cs.getPropertyValue('padding-left'),
            pr  : cs.getPropertyValue('padding-right'),
            pt  : cs.getPropertyValue('padding-top'),
            pb  : cs.getPropertyValue('padding-bottom')
        };

        Object.keys(t).forEach(key => {
            t[key] = parseInt(t[key], 10);
        });

        return t;
    }
    catch (e) {

        log(`couldn't call getComputedStyle`);

        return {};
    }
}

const docH = () => {
    // https://stackoverflow.com/a/1147768

    const body  = document.body,
        html    = document.documentElement;

    return Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
}

const get = key => {
    try {
        return JSON.parse(localStorage.getItem(key));
    }
    catch (e) {}
};

const set = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value, null, '    '));
    }
    catch (e) {}
};

class LayoutBase extends Component {
    constructor(...args) {
        super(...args);

        this.state = {
            nav     : get('nav') || false,
            aside   : get('aside') || false,
            hover   : false,
        }
    }
    layout = node ? () => {} : debounce(() => {

        if ( ! this.aside) {

            return;
        }

        if ( ! this.header) {

            return log('this.header not initialized yet...');
        }

        let tmp;



        const h = p(this.header);

        tmp = h.h + h.bt + h.mt + h.bb + h.mb;

        (function () {
            let s = document.querySelector('.session-time-left');

            if (s) {

                s = p(s);

                if (s) {

                    tmp += s.h + s.bt + s.mt + s.bb + s.mb;
                }
            }
        }());

        const ts = document.documentElement.scrollTop;

        if (ts < tmp) {
            tmp = tmp - ts;
        }
        else {
            tmp = 0;
        }

        this.aside.style.top = tmp + 'px';



        if (this.footer) {

            const f = p(this.footer);

            tmp = f.h + f.bt + f.mt + f.bb + f.mb;
        }

        const bs = docH() - ts - window.innerHeight;

        if (bs < tmp) {
            tmp = tmp - bs;
        }
        else {
            tmp = 0;
        }

        this.aside.style.bottom = tmp + 'px';

    }, 50)
    componentDidMount = () => {

        if ( ! node ) {

            this.layout();

            window.addEventListener('scroll', this.layout);

            window.addEventListener('resize', this.layout);
        }

        window.updateLayout = () => this.layout();
    }
    toggle = e => {

        const tag = e.target.parentNode.tagName.toLowerCase();

        this.setState(state => {

            const data = {
                [tag]: !state[tag]
            }

            set(tag, data[tag]);

            return data;
        });
    }
    render() {

        const {
            username,
            loginSignOut,
            requestDiff,
        } = this.props;

        return [
            <header key="header" ref={header => this.header = header}
                    onMouseEnter={() => this.setState({hover:true})}
                    onMouseLeave={() => this.setState({hover:false})}
            >
                <Link to="/admin">Admin area</Link>

                <table style={{
                    float: 'right'
                }}>
                    <tbody>
                    <tr>
                        <SessionTime
                            hover={this.state.hover}
                            requestDiff={requestDiff}
                        />
                        <td>
                            user: {username}
                        </td>
                        <td>
                            &nbsp;
                        </td>
                        <td>
                            <Popup
                                size="mini"
                                trigger={
                                    <Button
                                        onClick={loginSignOut}
                                        icon size="mini"
                                    >
                                        <Icon inverted color='black' name='log out' />
                                    </Button>
                                }
                                content='Sign out'
                                inverted
                            />

                        </td>
                    </tr>
                    </tbody>
                </table>
            </header>,
            <div key="div" className="main-flex">
                <nav
                    className={classnames({
                        hide: this.state.nav
                    })}
                >
                    <label>MAIN NAVIGATION</label>
                    <NavLink
                        to="/admin/users"
                        activeClassName="active"
                        exact={true}
                    >
                        <Icon name="users"></Icon> Users
                    </NavLink>
                    <NavLink
                        to="/admin/tinymce"
                        activeClassName="active"
                        exact={true}
                    >
                        <Icon name="edit"></Icon> Tinymce
                    </NavLink>
                    <div className="toggle" onClick={this.toggle}></div>
                </nav>
                <main>
                    {this.props.children}
                </main>
            </div>,
            <footer key="footer" ref={footer => this.footer = footer}>Admin area</footer>,
            ' ' || <aside
                key="aside"
                ref={aside => this.aside = aside}
                className={classnames({
                    hide: this.state.aside
                })}
            >

                <LayoutPadding>
                    <TabExtended>
                        {{
                            resource: {
                                menuItem: 'Resource',
                                render: (context, activateTabByName) => (
                                    <TabResourceListOrEditVisible
                                        activateTabByName={activateTabByName}
                                        id={false}
                                    />
                                )
                            },
                            'resource-edit': {
                                menuItem: 'Add resource',
                                render: (context, activateTabByName) => (
                                    <TabResourceFormVisible
                                        activateTabByName={activateTabByName}
                                    />
                                )
                            },
                            images: {
                                menuItem: 'Images',
                                render: (context, activateTabByName) => (
                                    <TabImageListOrEditVisible
                                        activateTabByName={activateTabByName}
                                        id={false}
                                    />
                                )
                            },
                            'images-edit': {
                                menuItem: 'Add image',
                                render: (context, activateTabByName) => (
                                    <TabImageFormVisible
                                        activateTabByName={activateTabByName}
                                    />
                                )
                            }
                        }}
                    </TabExtended>
                </LayoutPadding>

                <div className="toggle" onClick={this.toggle}></div>
            </aside>
        ];
    }
}

const mapStateToProps = state => ({
    username: getUsername(state)
});

const mapDispatchToProps = (dispatch, { match, edit, history, pathAfterSignOut }) => ({
    loginSignOut() {
        return dispatch(actions.loginSignOut(pathAfterSignOut))
    },
    requestDiff() {
        return dispatch(actions.requestSessionDiff());
    }
});

const LayoutBaseContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LayoutBase);

LayoutBaseContainer.hydrateTweak = () => {
    try {
        get('aside')    && document.querySelector('aside').classList.add('hide');
        get('nav')      && document.querySelector('nav').classList.add('hide');
    }
    catch (e) {
        log('LayoutBaseContainer.hydrateTweak error...')
    }
}

export default LayoutBaseContainer;
