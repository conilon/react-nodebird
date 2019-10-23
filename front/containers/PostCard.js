import React, { useState, useCallback, memo } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, Icon, Button, Avatar, List, Comment, Popover } from 'antd';
import styled from 'styled-components';
import moment from 'moment';
import { LOAD_COMMENTS_REQUEST, UNLIKE_POST_REQUEST, LIKE_POST_REQUEST, RETWEET_REQUEST, REMOVE_POST_REQUEST } from '../reducers/post';
import PostImages from '../components/PostImages';
import PostCardContent from '../components/PostCardContent';
import CommentForm from './CommentForm';
import { FOLLOW_USER_REQUEST, UNFOLLOW_USER_REQUEST } from '../reducers/user';
import FollowButton from '../components/FollowButton';

moment.locale('ko');

const CardWrapper = styled.div`
    margin-bottom: 20px;
`;

const PostCard = memo(({ post }) => {
    const [commentFormOpened, setCommentFormOpened] = useState(false);
    const id = useSelector((state) => state.user.me && state.user.me.id);
    const dispatch = useDispatch();

    const liked = id && post.Likers && post.Likers.find((v) => v.id === id);

    const onToggleComment = useCallback(() => {
        setCommentFormOpened((prev) => !prev);
        if (!commentFormOpened) {
            dispatch({
                type: LOAD_COMMENTS_REQUEST,
                data: post.id,
            });
        }
    }, [commentFormOpened]);

    const onToggleLike = useCallback(() => {
        if (!id) {
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
    }, [id, post && post.id, liked]);

    const onRetweet = useCallback(() => {
        if (!id) {
            return alert('로그인이 필요합니다.');
        }
        return dispatch({
            type: RETWEET_REQUEST,
            data: post.id,
        });
    }, [id, post && post.id]);

    const onFollow = useCallback((userId) => () => {
        dispatch({
            type: FOLLOW_USER_REQUEST,
            data: userId,
        });
    }, []);

    const onUnfollow = useCallback((userId) => () => {
        dispatch({
            type: UNFOLLOW_USER_REQUEST,
            data: userId,
        });
    }, []);

    const onRemovePost = useCallback((postId) => () => {
        dispatch({
            type: REMOVE_POST_REQUEST,
            data: postId,
        });
    }, []);

    return (
        <CardWrapper>
            <Card
                cover={post.Images && post.Images[0] && <PostImages images={post.Images} />}
                actions={[
                    <Icon type="retweet" key="retweet" onClick={onRetweet} />,
                    <Icon type="heart" key="heart" theme={liked ? 'twoTone' : 'outlined'} twoToneColor="#eb3f96" onClick={onToggleLike} />,
                    <Icon type="message" key="message" onClick={onToggleComment} />,
                    <Popover
                        key="ellipsis"
                        content={(
                            <Button.Group>
                                {id && post.UserId === id 
                                    ? (
                                        <>
                                            <Button>수정</Button>
                                            <Button type="danger" onClick={onRemovePost(post.id)}>삭제</Button>
                                        </>
                                    )
                                    : <Button>신고</Button>}
                            </Button.Group>
                        )}
                    >

                        <Icon type="ellipsis" key="ellipsis" />
                    </Popover>,
                ]}
                title={post.RetweetId ? `${post.User.nickname}님이 리트윗하셨습니다.` : null}
                extra={<FollowButton post={post} onUnfollow={onUnfollow} onFollow={onFollow} />}
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
                            {moment(post.createAt).format('YYYY.MM.DD.')}
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
                    <CommentForm post={post} />
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
        </CardWrapper>
    );
});

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
        UserId: PropTypes.number,
    }).isRequired,
};

export default PostCard;
