import React, { useState, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Checkbox, Button } from 'antd';
import { ADMIN_CATEGORY_CREATE_REQUEST } from '../../../../reducers/category';

const FormLayout = {
    labelCol: {
        xs: { span: 12 },
        sm: { span: 7 },
        md: { span: 5 },
        lg: { span: 5 }, 
        xl: { span: 5 }, 
        xxl: { span: 5 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
        md: { span: 16 },
        lg: { span: 16 },
        xl: { span: 16 },
        xxl: { span: 16 },
    },
};

const TailFormLayout = {
    wrapperCol: {
        xs: { span: 5, offset: 12 },
        sm: { span: 5, offset: 7 },
        md: { span: 5, offset: 5 },
        lg: { span: 5, offset: 5 },
        xl: { span: 5, offset: 5 },
        xxl: { span: 5, offset: 5 },
    },
};

const CategoryCreate = () => {
    const dispatch = useDispatch();

    const [name, setName] = useState();
    const [content, setContent] = useState();
    const [visible, setVisible] = useState(true);

    const nameRef = useRef();
    const contentRef = useRef();

    const onChangeName = useCallback((e) => {
        setName(e.target.value);
    }, []);

    const onChangeContent = useCallback((e) => {
        setContent(e.target.value);
    }, []);

    const onChangeVisible = useCallback((e) => {
        setVisible(e.target.checked);
    }, []);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if (!name || !name.trim()) {
            nameRef.current.focus();
            return alert('Please enter a name.');
        }
        if (!content || !content.trim()) {
            contentRef.current.focus();
            return alert('Please enter a content.');
        }
        const formData = new FormData();
        formData.append('name', name);
        formData.append('content', content);
        formData.append('visible', visible);

        return dispatch({
            type: ADMIN_CATEGORY_CREATE_REQUEST,
            data: formData,
        });
    }, [name, content, visible]);

    return (
        <Form encType="multipart/form-data" {...FormLayout}>
            <Form.Item label="name">
                <Input value={name} ref={nameRef} onChange={onChangeName} />
            </Form.Item>
            <Form.Item label="content">
                <Input value={content} ref={contentRef} onChange={onChangeContent} />
            </Form.Item>
            <Form.Item label="visible">
                <Checkbox checked={visible} onChange={onChangeVisible} />
            </Form.Item>
            <Form.Item {...TailFormLayout}>
                <Button type="primary" onClick={handleSubmit}>create</Button>
            </Form.Item>
        </Form>
    );
};

export default CategoryCreate;
