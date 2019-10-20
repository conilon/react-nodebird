import React, { useCallback, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { LOAD_HASHTAG_POSTS_REQUEST } from '../reducers/post';
import PostCard from '../components/PostCard';

const Hashtag = ({ tag }) => {
    const { mainPosts, hasMorePost } = useSelector((state) => state.post);
    const dispatch = useDispatch();
    const countRef = useRef([]);

    const onScroll = useCallback(() => {
        if (window.scrollY && window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
            if (hasMorePost) {
                const lastId = mainPosts[mainPosts.length - 1] && mainPosts[mainPosts.length - 1].id;
                if (!countRef.current.includes(lastId)) {
                    dispatch({
                        type: LOAD_HASHTAG_POSTS_REQUEST,
                        data: tag,
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
        <div>
            {mainPosts.map((c) => (
                <PostCard key={c.createdAt} post={c} />
            ))}
        </div>
    );
};

Hashtag.propTypes = {
    tag: PropTypes.string.isRequired,
};

Hashtag.getInitialProps = async (context) => {
    const { tag } = context.query;
    context.store.dispatch({
        type: LOAD_HASHTAG_POSTS_REQUEST,
        data: tag,
    });
    return { tag };
};

export default Hashtag;
