
import React, { Component } from 'react';

import LayoutPadding from '../../components/layout/LayoutPadding';

import {
    Breadcrumb,
    List,
    Button,
    Icon,
    Form,
    Checkbox,
    Loader,
    Modal,
    Header
} from 'semantic-ui-react';

const UserEdit = ({
    breadcrumb,

    form,
    errors,

    editField,

    onSubmit,

    togglePassword,
    showPassword,

    loading,
    sending,

    roles
}) => ([
    <LayoutPadding key="breadcrumb">
        <Breadcrumb size='massive'>
            {breadcrumb}
        </Breadcrumb>
    </LayoutPadding>,
    (loading) ?
        <Loader key="list" active inline='centered'
            style={{marginTop: '100px'}}
        /> :
        <LayoutPadding key="list">
            <Form onSubmit={() => onSubmit(form)}>
                <Form.Field
                    disabled={loading}
                    error={!!errors.firstName}
                >
                    <label>First Name</label>
                    <input placeholder='FirstName' value={form.firstName}
                           onChange={e => editField('firstName', e.target.value)}
                    />
                    {errors.firstName && <div className="error">{errors.firstName}</div>}
                </Form.Field>
                <Form.Field
                    disabled={loading}
                    error={!!errors.lastName}
                >
                    <label>Last Name</label>
                    <input placeholder='LastName' value={form.lastName}
                           onChange={e => editField('lastName', e.target.value)}
                    />
                    {errors.lastName && <div className="error">{errors.lastName}</div>}
                </Form.Field>
                <Form.Field
                    disabled={loading}
                    error={!!errors.roles}
                >
                    <label>Role</label>

                    <table>
                        <tbody>
                        <tr>
                            {roles && roles.map(role => (
                                <td style={{paddingRight: '10px'}} key={role.id}>
                                    <Checkbox
                                        label={role.name}
                                        checked={form.roles.indexOf(role.id) > -1}
                                        onChange={(e, data) => editField('roles', {id: role.id, checked: data.checked})}
                                    />
                                </td>
                            ))}
                        </tr>
                        </tbody>
                    </table>
                    {errors.roles && <div className="error">{errors.roles}</div>}
                </Form.Field>
                <Form.Field
                    disabled={loading}
                    error={!!errors.email}
                >
                    <label>Username</label>
                    <input placeholder='Username' value={form.email}
                           onChange={e => editField('email', e.target.value)}
                    />
                    {errors.email && <div className="error">{errors.email}</div>}
                </Form.Field>
                <Form.Field
                    disabled={loading}
                    error={!!errors.password}
                >
                    <label>Password</label>
                    <table width="100%">
                        <tbody>
                        <tr>
                            <td>
                        <input placeholder='Password'
                               value={form.password}
                               type={showPassword ? 'text' : 'password'}
                               onChange={e => editField('password', e.target.value)}
                               autoComplete="new-password"
                        />                                
                            </td>
                            <td width="23">
                                <Icon
                                    name="eye"
                                    disabled={!showPassword}
                                    onClick={togglePassword}
                                    style={{cursor:'pointer'}}
                                />
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    {errors.password && <div className="error">{errors.password}</div>}
                </Form.Field>
                <Form.Field
                    disabled={loading}
                >
                    <Form.Field
                        control={Checkbox}
                        label="Enabled"
                        checked={form.enabled}
                        onChange={(e, data) => editField('enabled', data.checked)}
                    />
                    {errors.enabled && <div className="error">{errors.enabled}</div>}
                </Form.Field>
                <Form.Field disabled={sending}>
                    <Button type='submit'>
                        {form.id ? 'Save changes' : 'Create'}
                    </Button>
                </Form.Field>
            </Form>
        </LayoutPadding>
]);

export default UserEdit;