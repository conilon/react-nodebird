import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOG_IN_REQUEST } from '../reducers/user';

const Home = () => {
    const { isLoggedIn } = useSelector((state) => state.user);
    const { mainPosts } = useSelector((state) => state.post);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: LOG_IN_REQUEST,
        });
    }, []);
    
    return (
        <div>
            {isLoggedIn && <PostForm />}
            {mainPosts.map((c) => (
                <PostCard key={+c.createdAt} post={c} />
            ))}
        </div>
    );
};

export default Home;
