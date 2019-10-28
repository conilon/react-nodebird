import React, { useCallback, useState, useEffect, useRef } from 'react';
import { Form, Input, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_POST_REQUEST, UPLOAD_IMAGES_REQUEST, REMOVE_IMAGE } from '../reducers/post';

const PostForm = () => {
    const [text, setText] = useState('');
    const imageInput = useRef();
    const { me } = useSelector((state) => state.user);
    const { isAddingPost, imagePaths, postAdded } = useSelector((state) => state.post);
    const dispatch = useDispatch();

    useEffect(() => {
        setText('');
    }, [postAdded === true]);

    const onSubmitForm = useCallback((e) => {
        e.preventDefault();
        if (!me) {
            return alert('로그인이 필요합니다.');
        }
        if (!text || !text.trim()) {
            return alert('게시글을 작성하세요.');
        }
        const formData = new FormData();
        imagePaths.forEach((i) => {
            formData.append('image', i);
        });
        formData.append('content', text);
        return dispatch({
            type: ADD_POST_REQUEST,
            data: formData,
        });
    }, [text, imagePaths]);

    const onChangeText = useCallback((e) => {
        setText(e.target.value);
    }, []);

    const onChangeImages = useCallback((e) => {
        const imageFormData = new FormData();
        [].forEach.call(e.target.files, (f) => {
            imageFormData.append('image', f);
        });
        e.target.value = null;
        dispatch({
            type: UPLOAD_IMAGES_REQUEST,
            data: imageFormData,
        });
      }, []);

    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    }, [imageInput.current]);

    const onRemoveImage = useCallback((index) => () => {
        dispatch({
            type: REMOVE_IMAGE,
            index,
        });
    }, []);

    return (
        <Form encType="multipart/form-data" onSubmit={onSubmitForm} style={{ margin: '10px 0 20px' }}>
            <Input.TextArea value={text} onChange={onChangeText} maxLength={140} placeholder="어떤 신기한 일이 있었나요?" />
            <div>
                <input type="file" ref={imageInput} onChange={onChangeImages} multiple hidden />
                <Button onClick={onClickImageUpload}>이미지 업로드</Button>
                <Button type="primary" htmlType="submit" loading={isAddingPost} style={{ float: 'right' }}>짹짹</Button>
            </div>
            <div>
                {imagePaths.map((v, i) => (
                    <div key={v} style={{ display: 'inline-block' }}>
                        <img src={v} alt={v} style={{ width: '200px' }} />
                        <div>
                            <Button onClick={onRemoveImage(i)}>제거</Button>
                        </div>
                    </div>
                ))}
            </div>
        </Form>
    );
};

export default PostForm;
