import React, { useCallback } from 'react';
import Link from 'next/link';
import { Card, Avatar, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { LOG_OUT_REQUEST } from '../reducers/user';

const UserProfile = () => {
    const { me } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const onLogout = useCallback(() => {
        dispatch({
            type: LOG_OUT_REQUEST,
        });
    }, []);

    return (
        <Card
            actions={[
                <div key="twit">짹짹<br />{me.Posts.length}</div>,
                <div key="following">팔로잉<br />{me.Followings.length}</div>,
                <div key="follower">팔로워<br />{me.Followers.length}</div>,
            ]}
        >
            <Card.Meta 
                avatar={<Link href={{ pathname: '/user', query: { id: me.id } }} as={`/user/${me.id}`}><a><Avatar>{me.nickname[0]}</Avatar></a></Link>}
                title={<Link href={{ pathname: '/user', query: { id: me.id } }} as={`/user/${me.id}`}><a style={{ textDecoration: 'none', color: '#000' }}>{me.nickname}</a></Link>}
            />
            <Button onClick={onLogout}>로그아웃</Button>
        </Card>
    );
};

export default UserProfile;
