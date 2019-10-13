import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

const Home = () => {
    const { isLoggedIn } = useSelector(state => state.user);
    const { mainPosts } = useSelector(state => state.post);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: 'HELLO_SAGA',
        });
        dispatch({
            type: 'HELLO_SAGA',
        });
        dispatch({
            type: 'HELLO_SAGA',
        });
        dispatch({
            type: 'HELLO_SAGA',
        });
        dispatch({
            type: 'HELLO_SAGA',
        });
        dispatch({
            type: 'HELLO_SAGA',
        });
    }, []);
    
    return (
        <div>
            {isLoggedIn && <PostForm /> }
            {mainPosts.map((c) => {
                return (
                    <PostCard key={+c.createdAt} post={c} />
                );
            })}
        </div>
    );
};

export default Home;