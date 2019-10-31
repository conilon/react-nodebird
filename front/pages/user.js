import React from 'react';
import { useSelector } from 'react-redux';
import { Card, Avatar } from 'antd';
import { LOAD_USER_REQUEST } from '../reducers/user';
import { LOAD_USER_POSTS_REQUEST } from '../reducers/post';
import PostCard from '../containers/PostCard';
import AppLayout from '../components/AppLayout';

const User = () => {
    const { mainPosts } = useSelector((state) => state.post);
    const { userInfo } = useSelector((state) => state.user);

    return (
        <AppLayout>
            {userInfo 
                ? (
                    <Card
                        actions={[
                            <div key="twit">짹짹<br />{userInfo.Posts}</div>,
                            <div key="following">팔로잉<br />{userInfo.Followings}</div>,
                            <div key="follower">팔로워<br />{userInfo.Followers}</div>,
                        ]}
                    >
                        <Card.Meta 
                            avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
                            title={userInfo.nickname}
                        />
                    </Card>
                )
                : null}
            {mainPosts.map((c) => (
                <PostCard key={c.id} post={c} />
            ))}
        </AppLayout>
    );
};

User.getInitialProps = async (context) => {
    const { id } = context.query;
    context.store.dispatch({
        type: LOAD_USER_REQUEST,
        data: id,
    });
    context.store.dispatch({
        type: LOAD_USER_POSTS_REQUEST,
        data: id,
    });
    return { id: parseInt(id, 10) };
};

export default User;
