import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_MAIN_POSTS_REQUEST } from '../reducers/post';

const Home = () => {
    const { me } = useSelector((state) => state.user);
    const { mainPosts } = useSelector((state) => state.post);
    const dispatch = useDispatch();

    const onScroll = () => {
        if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
            dispatch({
                type: LOAD_MAIN_POSTS_REQUEST,
                lastId: mainPosts[mainPosts.length - 1].id,
            });
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [mainPosts.length]);

    return (
        <div>
            {me && <PostForm />}
            {mainPosts.map((c) => (
                <PostCard key={c.createdAt} post={c} />
            ))}
        </div>
    );
};

Home.getInitialProps = async (context) => {
    context.store.dispatch({
        type: LOAD_MAIN_POSTS_REQUEST,
    });
};

export default Home;
