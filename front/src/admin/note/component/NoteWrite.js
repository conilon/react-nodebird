import React, { useState, useCallback, useRef, memo } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { Form, Input, Checkbox, Button, Select } from 'antd';
import { backUrl } from '../../../../config/config';
import { NOTE_ADD_REQUEST } from '../../../../reducers/note';

const ToastEditor = dynamic(() => import('../../../common/component/ToastEditor'), { ssr: false });

axios.defaults.baseURL = `${backUrl}/api`;

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

const NoteWrite = ({ pCategory }) => {
  const { Option } = Select;
  const dispatch = useDispatch();

  const [category, setCategory] = useState(pCategory[0].id);
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [tag, setTag] = useState();
  const [visible, setVisible] = useState(true);

  const titleRef = useRef();
  const contentRef = useRef();
  const tagRef = useRef();

  const onChangeCategory = useCallback((e) => {
    setCategory(e);
  }, []);

  const onChangeTitle = useCallback((e) => {
    setTitle(e.target.value);
  }, []);

  const onChangeContent = useCallback((v) => {
    setContent(v);
  }, []);

  const onChangeTag = useCallback((e) => {
    setTag(e.target.value);
  }, []);

  const onChangeVisible = useCallback((e) => {
    setVisible(e.target.checked);
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (!title || !title.trim()) {
      titleRef.current.focus();
      return alert('Please enter a title.');
    }
    if (!content || !content.trim()) {
      contentRef.current.focus();
      return alert('Please enter a content.');
    }
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('tag', tag);
    formData.append('visible', visible);
    formData.append('category', category);

    return dispatch({
      type: NOTE_ADD_REQUEST,
      data: formData,
    });
  }, [title, content, tag, visible, category]);

  const options = pCategory.map((v) => (
    <Option key={v.id} value={v.id}>{v.name}</Option>
  ));

  return (
    <Form encType="multipart/form-data" {...FormLayout}>
      <Form.Item label="category">
        <Select defaultValue={pCategory[0].id} style={{ width: 120 }} onChange={onChangeCategory}>
          {options}
        </Select>
      </Form.Item>
      <Form.Item label="title">
        <Input value={title} ref={titleRef} onChange={onChangeTitle} />
      </Form.Item>
      <Form.Item label="content">
        <ToastEditor onChangeContent={onChangeContent} content={content} />
      </Form.Item>
      <Form.Item label="hashtag">
        <Input value={tag} ref={tagRef} onChange={onChangeTag} />
      </Form.Item>
      <Form.Item label="visible">
        <Checkbox checked={visible} onChange={onChangeVisible} />
      </Form.Item>
      <Form.Item {...TailFormLayout}>
        <Button type="primary" onClick={handleSubmit}>submit</Button>
      </Form.Item>
    </Form>
  );
};

NoteWrite.propTypes = {
  pCategory: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
};

export default memo(NoteWrite);
