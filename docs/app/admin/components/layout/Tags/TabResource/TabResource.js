
import React, { Component } from 'react';

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

import './TabResource.scss';

export default ({
    list,
    deleting,

    onCreate,
    onEdit,

    deleteItem,
    cancelDelete,
    proposeToDelete,

    loading
}) => (
    <Tab.Pane loading={list === false}>
        {(list.length) ?
            <List divided verticalAlign="middle" className="resources-list">
                {list.map(item => (
                    <List.Item key={item.id}>
                        <List.Content floated="right">
                            <span className="date">{item.createAt}</span>
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
                            <Icon circular name="cloud upload"></Icon>
                            [{item.id}] {item.filename} [{item.extension}]
                        </List.Content>
                    </List.Item>
                ))}
            </List> :
            <Message negative>
                <Message.Header>List of resources is empty...</Message.Header>
            </Message>
        }

        <Modal
            basic
            size='small'
            //dimmer="blurring"
            closeOnDimmerClick={true}
            open={!!deleting}
            onClose={cancelDelete}
        >
            <Header icon='trash alternate outline' content='Delete language...' />
            <Modal.Content>
                <p>Do you really want to delete resource</p>
                <p>"<b>{deleting.filename}</b>" - (id: {deleting.id})</p>
                <p>?</p>
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
    </Tab.Pane>
);
