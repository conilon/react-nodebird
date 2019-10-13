import React, { useCallback, useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_POST_REQUEST } from '../reducers/post';

const PostForm = () => {
    const [text, setText] = useState('');
    const { isAddingPost, imagePaths, postAdded } = useSelector((state) => state.post);
    const dispatch = useDispatch();

    useEffect(() => {
        setText('');
    }, [postAdded === true]);

    const onSubmitForm = useCallback((e) => {
        e.preventDefault();
        dispatch({
            type: ADD_POST_REQUEST,
            data: {
                text,
            },
        });
    }, []);

    const onChangeText = useCallback((e) => {
        setText(e.target.value);
    }, []);

    return (
        <Form encType="multipart/form-data" onSubmit={onSubmitForm} style={{ margin: '10px 0 20px' }}>
            <Input.TextArea value={text} onChange={onChangeText} maxLength={140} placeholder="어떤 신기한 일이 있었나요?" />
            <div>
                <input type="file" multiple hidden />
                <Button>이미지 업로드</Button>
                <Button type="primary" htmlType="submit" loading={isAddingPost} style={{ float: 'right' }}>짹짹</Button>
            </div>
            <div>
                {imagePaths.map((v) => (
                    <div key={v} style={{ display: 'inline-block' }}>
                        <img src={`http://localhost:3065/${v}`} alt={v} style={{ width: '200px' }} />
                        <div>
                            <Button>제거</Button>
                        </div>
                    </div>
                ))}
            </div>
        </Form>
    );
};

export default PostForm;
