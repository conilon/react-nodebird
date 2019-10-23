import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import NicknameEditForm from '../containers/NicknameEditForm';
import { LOAD_FOLLOWINGS_REQUEST, LOAD_FOLLOWERS_REQUEST, UNFOLLOW_USER_REQUEST, REMOVE_FOLLOWER_REQUEST } from '../reducers/user';
import { LOAD_USER_POSTS_REQUEST } from '../reducers/post';
import PostCard from '../containers/PostCard';
import FollowList from '../components/FollowList';

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
            <FollowList 
                header="팔로잉 목록" 
                hasMore={hasMoreFollowing} 
                onClickMore={loadMoreFollowings} 
                data={followingList} 
                onClickStop={onUnfollow} 
            />
            <FollowList 
                header="팔로워 목록" 
                hasMore={hasMoreFollower} 
                onClickMore={loadMoreFollowers} 
                data={followerList} 
                onClickStop={onRemoveFollower} 
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
