import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Input, Button } from 'antd';
import { ADD_COMMENT_REQUEST } from '../reducers/post';

const CommentForm = ({ post }) => {
    const [commentText, setCommentText] = useState('');
    const { commentAdded, isAddingComment } = useSelector((state) => state.post);
    const { me } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const onSubmitComment = useCallback((e) => {
        e.preventDefault();
        if (!me) {
            return alert('로그인이 필요합니다.');
        }
        if (!commentText || !commentText.trim()) {
            return alert('댓글을 작성하세요.');
        }
        return dispatch({
            type: ADD_COMMENT_REQUEST,
            data: {
                postId: post.id,
                content: commentText.trim(),
            },
        });
    }, [me && me.id, commentText]);

    useEffect(() => {
        setCommentText('');
    }, [commentAdded === true]);

    const onChangeCommentText = useCallback((e) => {
        setCommentText(e.target.value);
    }, []);

    return (
        <Form onSubmit={onSubmitComment}>
            <Form.Item>
                <Input.TextArea row={4} value={commentText} onChange={onChangeCommentText} />
                <Button type="primary" htmlType="submit" loading={isAddingComment}>삐약</Button>
            </Form.Item>
        </Form>
    );
};

CommentForm.propTypes = {
    post: PropTypes.object.isRequired,
};

export default CommentForm;
