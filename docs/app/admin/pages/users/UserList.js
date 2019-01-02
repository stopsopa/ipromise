
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import LayoutPadding from '../../components/layout/LayoutPadding';

import './UserList.scss';

import {
    Breadcrumb,
    List,
    Button,
    Icon,
    Popup,
    Modal,
    Header,
    Loader,
    Message
} from 'semantic-ui-react';

const UserList = ({
    list,
    deleting,

    onCreate,
    onEdit,

    deleteItem,
    cancelDelete,
    proposeToDelete,

    loading
}) => ([
    <LayoutPadding key="breadcrumb">
        <Breadcrumb size='massive'>
            <Breadcrumb.Section>Users</Breadcrumb.Section>
        </Breadcrumb>
        <Button
            style={{float:'right'}}
            onClick={onCreate}
        >Create</Button>
    </LayoutPadding>,
    <LayoutPadding key="list" className="users-list">
        {(list === false) ?
            <Loader key="list" active inline='centered'
                    style={{marginTop: '100px'}}
            /> :
            (
                (list.length) ?
                    <List divided verticalAlign="middle">
                        {list.map(item => (
                            <List.Item key={item.id}>
                                <List.Content floated="right">
                                    <Button.Group size="mini">
                                        <Button
                                            onClick={() => onEdit(item.id)}
                                            disabled={loading}
                                        >
                                            Edit
                                        </Button>
                                        <Popup
                                            trigger={
                                                <Button
                                                    color="red"
                                                    icon='trash alternate outline'
                                                    onClick={() => proposeToDelete(item.id)}
                                                    disabled={loading}
                                                />
                                            }
                                            content='Delete'
                                            inverted
                                            size="mini"
                                            position="top center"
                                        />

                                    </Button.Group>
                                </List.Content>
                                <List.Content>
                                    <Icon circular name="user" disabled={item.enabled == 1 ? false : true}></Icon>
                                    {item.firstName} {item.lastName}
                                    <span className="roles">
                                        {item.roles.map(role => (
                                            <span key={role} className={role}>{role}</span>
                                        ))}
                                    </span>
                                </List.Content>
                            </List.Item>
                        ))}
                    </List> :
                    <Message negative>
                        <Message.Header>List of users is empty...</Message.Header>
                    </Message>
            )
        }

        <Modal
            basic
            size='small'
            //dimmer="blurring"
            closeOnDimmerClick={true}
            open={!!deleting}
            onClose={cancelDelete}
        >
            <Header icon='trash alternate outline' content='Delete user...' />
            <Modal.Content>
                <p>Do you really want to delete user ?</p>
                <p>"<b>{deleting.firstName} {deleting.lastName}</b>" - (id: {deleting.id})</p>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    color="red"
                    onClick={() => {
                        deleteItem(deleting.id)
                        cancelDelete()
                    }}
                >
                    <Icon name='trash alternate outline' /> Yes
                </Button>
                <Button
                    basic
                    color='green'
                    inverted
                    onClick={cancelDelete}
                >
                    <Icon name='remove' /> No
                </Button>
            </Modal.Actions>
        </Modal>
    </LayoutPadding>
]);

UserList.propTypes = {
    list: PropTypes.oneOfType([
        PropTypes.oneOf([false]),
        PropTypes.array
    ]).isRequired,
    loading: PropTypes.bool.isRequired
}

export default UserList;