import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, Icon, Button, Avatar, Form, Input, List, Comment } from 'antd';
import { ADD_COMMENT_REQUEST, LOAD_COMMENTS_REQUEST, UNLIKE_POST_REQUEST, LIKE_POST_REQUEST, RETWEET_REQUEST } from '../reducers/post';
import PostImages from './PostImages';
import PostCardContent from './PostCardContent';

const PostCard = ({ post }) => {
    const [commentFormOpened, setCommentFormOpened] = useState(false);
    const [commentText, setCommentText] = useState('');
    const { me } = useSelector((state) => state.user);
    const { commentAdded, isAddingComment } = useSelector((state) => state.post);
    const dispatch = useDispatch();

    const liked = me && post.Likers && post.Likers.find((v) => v.id === me.id);

    const onToggleComment = useCallback(() => {
        setCommentFormOpened((prev) => !prev);
        if (!commentFormOpened) {
            dispatch({
                type: LOAD_COMMENTS_REQUEST,
                data: post.id,
            });
        }
    }, [commentFormOpened]);

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

    const onToggleLike = useCallback(() => {
        if (!me) {
            return alert('로그인이 필요합니다.');
        }
        if (liked) { // 좋아요 누른 상태
            return dispatch({
                type: UNLIKE_POST_REQUEST,
                data: post.id,
            });
        } 
        return dispatch({ // 좋아요 안 누른 상태
            type: LIKE_POST_REQUEST,
            data: post.id,
        });
    }, [me && me.id, post && post.id, liked]);

    const onRetweet = useCallback(() => {
        if (!me) {
            return alert('로그인이 필요합니다.');
        }
        return dispatch({
            type: RETWEET_REQUEST,
            data: post.id,
        });
    }, [me && me.id, post && post.id]);

    return (
        <div>
            <Card
                key={+post.createAt}
                cover={post.Images && post.Images[0] && <PostImages images={post.Images} />}
                actions={[
                    <Icon type="retweet" key="retweet" onClick={onRetweet} />,
                    <Icon type="heart" key="heart" theme={liked ? 'twoTone' : 'outlined'} twoToneColor="#eb3f96" onClick={onToggleLike} />,
                    <Icon type="message" key="message" onClick={onToggleComment} />,
                    <Icon type="ellipsis" key="ellipsis" />,
                ]}
                title={post.RetweetId ? `${post.User.nickname}님이 리트윗하셨습니다.` : null}
                extra={<Button>팔로우</Button>}
            >
                {post.RetweetId && post.Retweet 
                    ? (
                        <Card
                            cover={post.Retweet.Images[0] && <PostImages images={post.Retweet.Images} />}
                        >
                            <Card.Meta 
                                avatar={(
                                    <Link href={{ pathname: '/user', query: { id: post.Retweet.User.id } }} as={`/user/${post.Retweet.User.id}`}>
                                        <a><Avatar>{post.Retweet.User.nickname[0]}</Avatar></a>
                                    </Link>
                                )}
                                title={(
                                    <Link href={{ pathname: '/user', query: { id: post.Retweet.User.id } }} as={`/user/${post.Retweet.User.id}`}>
                                        <a style={{ textDecoration: 'none', color: '#000' }}>{post.Retweet.User.nickname}</a>
                                    </Link>
                                )}
                                description={<PostCardContent postData={post.Retweet.content} />}
                            />
                        </Card>
                    )
                    : (
                        <Card.Meta 
                            avatar={(
                                <Link href={{ pathname: '/user', query: { id: post.User.id } }} as={`/user/${post.User.id}`}>
                                    <a><Avatar>{post.User.nickname[0]}</Avatar></a>
                                </Link>
                            )}
                            title={(
                                <Link href={{ pathname: '/user', query: { id: post.User.id } }} as={`/user/${post.User.id}`}>
                                    <a style={{ textDecoration: 'none', color: '#000' }}>{post.User.nickname}</a>
                                </Link>
                            )}
                            description={<PostCardContent postData={post.content} />}
                        />
                    )}
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
                                    author={<Link href={{ pathname: '/user', query: { id: item.User.id } }} as={`/user/${item.User.id}`}><a style={{ textDecoration: 'none', color: '#000' }}>{item.User.nickname}</a></Link>}
                                    avatar={<Link href={{ pathname: '/user', query: { id: item.User.id } }} as={`/user/${item.User.id}`}><a><Avatar>{item.User.nickname[0]}</Avatar></a></Link>}
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
        Images: PropTypes.array,
        createAt: PropTypes.object,
        Comments: PropTypes.array,
        id: PropTypes.number,
        Likers: PropTypes.array,
        Retweet: PropTypes.object,
        RetweetId: PropTypes.number,
    }).isRequired,
};

export default PostCard;
