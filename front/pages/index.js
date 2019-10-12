import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { loginAction, logoutAction } from '../reducers/user.js';

const dummy = {
    isLoggedIn: true,
    imagePaths: [],
    mainPosts: [{
        User: {
            id: 1,
            nickname: 'th',
        },
        content: '첫 번째 게시글',
        img: 'https://w.namu.la/s/992a8aba82a1e00dd3f120bf3ff3e94a54e5a2cc70cd011c05b1e6abebfc715c261e3d5b719a30d4e2941180a43d44ff4ebc57b282475caa1fff82cb55bc5142efefa9cd1d754dbb98b7f29db282e3f66bcb5b12555bda684c75cce46179f2ca0be016c7d77ba5db8721608208963616',
    }],
};

const Home = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(loginAction);
        dispatch(logoutAction);
        dispatch(loginAction);
    }, []);

    return (
        <div>
            {user ? <div>{user.nickname}님이 로그인 했습니다.</div> : <div>로그아웃 했습니다.</div>}
            {dummy.isLoggedIn && <PostForm /> }
            {dummy.mainPosts.map((c) => {
                return (
                    <PostCard key={+c.createdAt} post={c} />
                );
            })}
        </div>
    );
};

export default Home;
