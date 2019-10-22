import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, List, Card, Icon } from 'antd';
import Router from 'next/router';
import NicknameEditForm from '../components/NicknameEditForm';
import { LOAD_FOLLOWINGS_REQUEST, LOAD_FOLLOWERS_REQUEST, UNFOLLOW_USER_REQUEST, REMOVE_FOLLOWER_REQUEST } from '../reducers/user';
import { LOAD_USER_POSTS_REQUEST } from '../reducers/post';
import PostCard from '../components/PostCard';

const Profile = () => {
    const { me, followingList, followerList, hasMoreFollowing, hasMoreFollower } = useSelector((state) => state.user);
    const { mainPosts } = useSelector((state) => state.post);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!me) {
            alert('로그인 정보가 없습니다. 메인페이지로 이동합니다.');
            Router.push('/');
        }
    }, [me && me.id]);

    const onUnfollow = useCallback((userId) => () => {
        dispatch({
            type: UNFOLLOW_USER_REQUEST,
            data: userId,
        });
    }, []);

    const onRemoveFollower = useCallback((userId) => () => {
        dispatch({
            type: REMOVE_FOLLOWER_REQUEST,
            data: userId,
        });
    }, []);

    const loadMoreFollowings = useCallback(() => {
        dispatch({
            type: LOAD_FOLLOWINGS_REQUEST,
            offset: followingList.length,
        });
    }, [followingList.length]);

    const loadMoreFollowers = useCallback(() => {
        dispatch({
            type: LOAD_FOLLOWERS_REQUEST,
            offset: followerList.length,
        });
    }, [followerList.length]);

    if (!me) {
        return null;
    }

    return (
        <div>
            <NicknameEditForm />
            <List
                style={{ marginBottom: '20px' }}
                grid={{ gutter: 4, xs: 2, md: 3 }}
                size="small"
                header={<div>팔로잉 목록</div>}
                loadMore={hasMoreFollowing && <Button onClick={loadMoreFollowings} style={{ width: '100%' }}>더보기</Button>}
                bordered
                dataSource={followingList}
                renderItem={(item) => (
                    <List.Item style={{ marginTop: '20px' }}>
                        <Card actions={[<Icon key="stop" type="stop" />]} onClick={onUnfollow(item.id)}>
                            <Card.Meta description={item.nickname} />
                        </Card>
                    </List.Item>
                )}
            />
            <List
                style={{ marginBottom: '20px' }}
                grid={{ gutter: 4, xs: 2, md: 3 }}
                size="small"
                header={<div>팔로워 목록</div>}
                loadMore={hasMoreFollower && <Button onClick={loadMoreFollowers} style={{ width: '100%' }}>더보기</Button>}
                bordered
                dataSource={followerList}
                renderItem={(item) => (
                    <List.Item style={{ marginTop: '20px' }}>
                        <Card actions={[<Icon key="stop" type="stop" />]} onClick={onRemoveFollower(item.id)}>
                            <Card.Meta description={item.nickname} />
                        </Card>
                    </List.Item>
                )}
            />
            <div>
                {mainPosts.map((c) => (
                    <PostCard key={c.id} post={c} />
                ))}
            </div>
        </div>
    );
};

Profile.getInitialProps = (context) => {
    const state = context.store.getState();
    // 이 직전에 LOAD_USERS_REQUEST
    context.store.dispatch({
        type: LOAD_FOLLOWINGS_REQUEST,
        data: state.user.me && state.user.me.id,
    });
    context.store.dispatch({
        type: LOAD_FOLLOWERS_REQUEST,
        data: state.user.me && state.user.me.id,
    });
    context.store.dispatch({
        type: LOAD_USER_POSTS_REQUEST,
        data: state.user.me && state.user.me.id,
    });

    // 이 쯤에서 LOAD_USER_SUCCESS 돼서 me가 생긴다.
};

export default Profile;
