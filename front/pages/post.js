import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Router from 'next/router';
import { LOAD_POST_REQUEST } from '../reducers/post';

const Post = ({ id }) => {
    const { singlePost } = useSelector((state) => state.post);

    useEffect(() => {
        if (!singlePost) {
            alert('없는 포스트입니다. 메인페이지로 이동합니다.');
            Router.push('/');
        }
    }, [singlePost && singlePost.id]);

    if (!singlePost) {
        return null;
    }

    return (
        <>
            <Helmet
                title={`${singlePost.User.nickname}님의 글`}
                description={singlePost.content}
                meta={[{
                    name: 'description', content: singlePost.content,
                }, {
                    property: 'og:title', content: `${singlePost.User.nickname}님의 게시글`,
                }, {
                    property: 'og:description', content: singlePost.content,
                }, {
                    property: 'og:image', content: singlePost.Images[0] && `http://localhost:3065/${singlePost.Images[0].src}`,
                }, {
                    property: 'og:url', content: `http://localhost:3060/post/${id}`,
                }]}
            />
            <div itemScope="content">{singlePost.content}</div>
            <div itemScope="author">{singlePost.User.nickname}</div>
            <div>{singlePost.Images[0] && <img src={`http://localhost:3065/${singlePost.Images[0].src}`} alt="example" />}</div>
        </>
    );
};

Post.getInitialProps = async (context) => {
    context.store.dispatch({
        type: LOAD_POST_REQUEST,
        data: context.query.id,
    });
    return { id: parseInt(context.query.id, 10) };
};

Post.propTypes = {
    id: PropTypes.number.isRequired,
};

export default Post;