
import React, { Component } from 'react';

import classnames from 'classnames';

import filesize from 'filesize';

import Dropzone from 'react-dropzone';

import {
    Form,
    Checkbox,
    Breadcrumb,
    List,
    Button,
    Icon,
    Popup,
    Modal,
    Header,
    Loader,
    Message,
    Tab,
    Input
} from 'semantic-ui-react';

export default ({
    form,
    errors,

    editField,

    onSubmit,

    loading,

    onDrop,
    dropzoneCancel,
    file,
}) => (
    <Form onSubmit={() => onSubmit(form, file)}>
        <Form.Field>
            <Form.Field
                control={Input}
                label="Type"
                value={form.type}
                error={!!errors.type}
                placeholder="Type"
                onChange={e => editField('type', e.target.value)}
            />
            {errors.type && <div className="error">{errors.type}</div>}
        </Form.Field>
        <Form.Field>
            <Form.Field
                control={Input}
                label="Change file name"
                value={form.filename}
                error={!!errors.filename}
                placeholder="File name"
                onChange={e => editField('filename', e.target.value)}
            />
            {errors.filename && <div className="error">{errors.filename}</div>}
        </Form.Field>

        {form.url &&
            <Form.Field>
                <a href={form.url} target="_blank">{form.url.replace(/^(.*)?\?.*$/g, '$1')}</a> <br/>
                ({filesize(form.size)})
            </Form.Field>
        }
        <Form.Field>
            <Dropzone
                // accept=".jpeg,.png"
                onDrop={onDrop}
                multiple={false}
                preventDropOnDocument={false}
                className={classnames('dropzone', {
                    'dropzone-selectedFileClassName': !!file,
                    'validation-error': errors.realfile && !file
                })}
                activeClassName="dropzone-activeClassName"
                acceptClassName="dropzone-acceptClassName"
                rejectClassName="dropzone-rejectClassName"
                disabledClassName="dropzone-disabledClassName"
            >
                {file ?
                    <div>
                        <strong>{file.name}</strong> - ready to send
                        <Popup
                            trigger={
                                <span className="cancel" onClick={dropzoneCancel}>x</span>
                            }
                            content='Cancel uploading this file'
                            inverted
                            size="mini"
                            position="top left"
                        />
                    </div> :
                    <div><Icon name="cloud upload" size="large"/> Drop files to attach, or <a href="javascript:void(0);">browse</a>.</div>
                }
            </Dropzone>
        </Form.Field>
        {(errors.realfile) && <div className="error" style={{marginBottom: '13px'}}>{errors.realfile}</div>}
        <Form.Field disabled={loading}>
            <Button type='submit'>
                {form.id ? 'Save changes' : 'Create'}
            </Button>
        </Form.Field>
    </Form>
);

