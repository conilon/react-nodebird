import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, Icon, Button, Avatar, Form, Input, List, Comment } from 'antd';
import { ADD_COMMENT_REQUEST } from '../reducers/post';

const PostCard = ({ post }) => {
    const [commentFormOpened, setCommentFormOpened] = useState(false);
    const [commentText, setCommentText] = useState('');
    const { me } = useSelector((state) => state.user);
    const { commentAdded, isAddingComment } = useSelector((state) => state.post);
    const dispatch = useDispatch();
    
    const onToggleComment = useCallback(() => {
        setCommentFormOpened((prev) => !prev);
    }, []);

    const onSubmitComment = useCallback((e) => {
        e.preventDefault();
        if (!me) {
            return alert('로그인이 필요합니다.');
        }
        return dispatch({
            type: ADD_COMMENT_REQUEST,
            data: {
                postId: post.id,
            },
        });
    }, [me && me.id]);

    useEffect(() => {
        setCommentText('');
    }, [commentAdded === true]);

    const onChangeCommentText = useCallback((e) => {
        setCommentText(e.target.value);
    }, []);

    return (
        <div>
            <Card
                key={+post.createAt}
                cover={post.img && <img src={post.img} alt="example" />}
                actions={[
                    <Icon type="retweet" key="retweet" />,
                    <Icon type="heart" key="heart" />,
                    <Icon type="message" key="message" onClick={onToggleComment} />,
                    <Icon type="ellipsis" key="ellipsis" />,
                ]}
                extra={<Button>팔로우</Button>}
            >
                <Card.Meta 
                    avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
                    title={post.User.nickname}
                    description={(
                        <div>
                            {post.content.split(/(#[^\s]+)/g).map((v) => {
                                if (v.match(/#[^\s]+/)) {
                                    return (
                                        <Link href={`/hashtag/${v.slice(1)}`} key={v}><a>{v}</a></Link>
                                    );
                                }
                                return v;
                            })}
                        </div>
                    )}
                />
            </Card>
            {commentFormOpened && (
                <>
                    <Form onSubmit={onSubmitComment}>
                        <Form.Item>
                            <Input.TextArea row={4} value={commentText} onChange={onChangeCommentText} />
                            <Button type="primary" htmlType="submit" loading={isAddingComment}>삐약</Button>
                        </Form.Item>
                    </Form>
                    <List 
                        header={`${post.Comments ? post.Comments.length : 0} 댓글`}
                        itemLayout="horizontal"
                        dataSource={post.Comments || []}
                        renderItem={(item) => (
                            <li>
                                <Comment 
                                    author={item.User.nickname}
                                    avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                                    content={item.content}
                                    datetime={item.createAt}
                                />
                            </li>
                        )}
                    />
                </>
            )}
        </div>
    );
};

PostCard.propTypes = {
    post: PropTypes.shape({
        User: PropTypes.object,
        content: PropTypes.string,
        img: PropTypes.string,
        createAt: PropTypes.object,
        Comments: PropTypes.array,
        id: PropTypes.number,
    }).isRequired,
};

export default PostCard;
