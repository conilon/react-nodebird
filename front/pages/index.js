import React, { useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import { Menu, Input } from 'antd';
import PostForm from '../containers/PostForm';
import PostCard from '../containers/PostCard';
import { LOAD_MAIN_POSTS_REQUEST } from '../reducers/post';
import AppLayout from '../components/AppLayout';

const Home = () => {
    const { me } = useSelector((state) => state.user);
    const { mainPosts, hasMorePost } = useSelector((state) => state.post);
    const dispatch = useDispatch();
    const countRef = useRef([]);

    const onSearch = useCallback((value) => {
        Router.push({ pathname: '/hashtag', query: { tag: value } }, `/hashtag/${value}`);
    }, []);

    const onScroll = useCallback(() => {
        if (window.pageYOffset && window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
            if (hasMorePost) {
                const lastId = mainPosts[mainPosts.length - 1] && mainPosts[mainPosts.length - 1].id;
                if (!countRef.current.includes(lastId)) {
                    dispatch({
                        type: LOAD_MAIN_POSTS_REQUEST,
                        lastId,
                    });
                    countRef.current.push(lastId);
                }
            }
        }
    }, [hasMorePost, mainPosts.length]);

    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [mainPosts.length]);
    
    return (
        <AppLayout>
            <Menu mode="horizontal">
                <Menu.Item key="search">
                    <Input.Search onSearch={onSearch} />
                </Menu.Item>
            </Menu>
            {me && <PostForm />}
            {mainPosts.map((c) => (
                <PostCard key={c.id} post={c} />
            ))}
        </AppLayout>
    );
};

Home.getInitialProps = async (context) => {
    context.store.dispatch({
        type: LOAD_MAIN_POSTS_REQUEST,
    });
};

export default Home;
