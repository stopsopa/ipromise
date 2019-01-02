
import React, { Component, Fragment } from 'react';

import classnames from 'classnames';

import {
    Button,
    Checkbox,
    Form,
    Header,
    Input,
    Message,
    Icon
} from 'semantic-ui-react'

import './LoginForm.scss';

import countdown from 'roderic/libs/react/countdown';

export default class LoginForm extends Component {
    componentWillUnmount() {

        const {
            isNode,
        } = this.props;

        isNode || document.body.classList.remove('login-form');
    }
    render = () => {

        const {
            // loading,
            error,
            role,
            authenticated,
            header,
            onSubmit,
            onChange,
            onRefreshSession,
            loading,
            action,
            isNode,
            hiddenName,
            hiddenValue,
            browsertime,
            children,
            onSignOut,
            timeLeftMessageSecIfLessThan,
            sessionTimeLeftSec,
        } = this.props;

        let content = null;

        if (authenticated) {

            isNode || document.body.classList.remove('login-form');

            return (
                <Fragment>
                    {
                        (sessionTimeLeftSec !== false && sessionTimeLeftSec !== 0) &&
                        (sessionTimeLeftSec < timeLeftMessageSecIfLessThan) &&
                        <div className="session-time-left">
                            <Button size="mini" onClick={onRefreshSession}>
                                <Icon name='refresh' /> refresh
                            </Button>
                            Session is about to expire within: {countdown(sessionTimeLeftSec)}
                        </div>
                    }
                    {
                        children ||
                        <div>
                            <Button size="tiny" onClick={onSignOut}>
                                <Icon name="log out" /> Sign out
                            </Button>
                        </div>
                    }
                </Fragment>
            );
        }
        else {

            isNode || document.body.classList.add('login-form');

            content = (
                <div>
                    {header || <span className='text-center d-block mb-2'>Roderic</span>}
                    <div>
                        <Form
                            action={action}
                            size="mini"
                            disabled={loading}
                            method="POST"
                            onSubmit={onSubmit}
                        >
                            <Form.Field>
                                <label htmlFor="username">First Name</label>
                                {/* https://stackoverflow.com/a/37601110/5560682 */}
                                <Input
                                    name="username"
                                    placeholder="Username"
                                    autoComplete="username"
                                    autoCorrect="off"
                                    spellCheck="false"
                                    required
                                    loading={loading}
                                    disabled={loading}
                                    icon="user"
                                    iconPosition="left"
                                    onChange={e => onChange(e, 'username')}
                                    error={!!error}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor="password">Password</label>
                                <Input
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    autoComplete="password"
                                    autoCorrect="off"
                                    spellCheck="false"
                                    required
                                    loading={loading}
                                    disabled={loading}
                                    icon="lock"
                                    iconPosition="left"
                                    onChange={e => onChange(e, 'password')}
                                    error={!!error}
                                />
                            </Form.Field>
                            {(error && !loading) &&
                                <Message
                                    negative
                                    size="tiny"
                                    color="red"
                                >
                                    <Icon name="warning sign" />
                                    {error}
                                </Message>
                            }
                            <Button
                                type="submit"
                                size="mini"
                                primary={!loading}
                                disabled={loading}
                            >Login</Button>
                            <input
                                type="hidden"
                                name={hiddenName}
                                value={hiddenValue}
                            />
                            <input
                                type="hidden"
                                name="role"
                                value={role}
                            />
                            <input
                                type="hidden"
                                name="browsertime"
                                value={browsertime}
                            />
                        </Form>
                    </div>
                </div>
            );
        }

        return (
            <section className={classnames('login-form-section', {'shake': !!error})}>
                {content}
            </section>
        );
    };
};