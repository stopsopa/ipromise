
import React, { Component, Fragment } from 'react';

import {
    Breadcrumb,
    List,
    Button,
    Icon,
    Image,
    Popup,
    Modal,
    Header,
    Loader,
    Message,
    Tab
} from 'semantic-ui-react';

import './TabImage.scss';

export default ({
    list,
    deleting,

    onCreate,
    onEdit,

    deleteItem,
    cancelDelete,
    proposeToDelete,

    loading
}) => {

    const cantDelete = !!(deleting.buckets || deleting.materials || deleting.support_groups);

    return (
        <Tab.Pane loading={list === false}>
            {(list.length) ?
                <List divided verticalAlign="middle" className="images-list">
                    {list.map(item => (
                        <List.Item key={item.id}>
                            <List.Content floated="right">
                                <span className="date">
                                    {item.width && "["}
                                    {item.width && <b>{item.width}x{item.height}</b>}
                                    {item.width && "] "}
                                    {item.createAt}
                                </span>
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
                                {item.width ?
                                    <Image src={item.url} width="28" height="28" avatar/> :
                                    <Icon circular name="cloud upload"></Icon>
                                }
                                [{item.id}] {item.filename} [{item.extension}]
                            </List.Content>
                        </List.Item>
                    ))}
                </List> :
                <Message negative>
                    <Message.Header>List of images is empty...</Message.Header>
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
                <Header icon='trash alternate outline' content='Delete image...'/>
                <Modal.Content>


                    {
                        cantDelete ?
                            <Fragment>
                                <p>This Image cannot be deleted because below it is linked to below items</p>
                                <p>(Buckets: {deleting.buckets})</p>
                                <p>(Materials: {deleting.materials})</p>
                                <p>(Support Groups: {deleting.support_groups})</p>
                            </Fragment>
                            :
                            <Fragment>
                                <p>Do you really want to delete image ?</p>
                                <p>"<b>{deleting.filename}</b>" - (id: {deleting.id})</p>
                            </Fragment>
                    }


                </Modal.Content>
                <Modal.Actions>
                    {cantDelete || <Button
                        color="red"
                        onClick={() => {
                            deleteItem(deleting.id)
                            cancelDelete()
                        }}
                    >
                        <Icon name='trash alternate outline'/> Yes
                    </Button>}
                    <Button
                        basic
                        color='green'
                        inverted
                        onClick={cancelDelete}
                    >
                        <Icon name='remove'/> No
                    </Button>
                </Modal.Actions>
            </Modal>
        </Tab.Pane>
    )
};
