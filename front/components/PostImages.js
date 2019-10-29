import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import ImagesZoom from './ImagesZoom';

const PostImages = ({ images }) => {
    const [showImagesZoom, setShowImagesZoom] = useState(false);

    const onZoom = useCallback(() => {
        setShowImagesZoom(true);
    }, []);

    const onClose = useCallback(() => {
        setShowImagesZoom(false);
    }, []);

    if (images.length === 1) {
        return (
            <>
                <div onClick={onZoom}>
                    <img src={images[0].src.replace(/original\//, 'thumb/')} alt="example" style={{ width: '100%' }} />
                </div>
                {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
            </>
        );
    }
    if (images.length === 2) {
        return (
            <>
                <div onClick={onZoom}>
                    <img src={images[0].src.replace(/original\//, 'thumb/')} alt="example" style={{ width: '50%' }} />
                    <img src={images[1].src.replace(/original\//, 'thumb/')} alt="example" style={{ width: '50%' }} />
                </div>
                {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
            </>
        );
    }
    return (
        <>
            <div>
                <img src={images[0].src.replace(/original\//, 'thumb/')} alt="example" style={{ width: '50%' }} />
                <div onClick={onZoom} style={{ display: 'inline-block', width: '50%', textAlign: 'center', verticalAlign: 'middle' }}>
                    <Icon type="plus" />
                    <br />
                    {images.length - 1} 개의 사진 더보기
                </div>
            </div>
            {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
        </>
    );
};

PostImages.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        src: PropTypes.string,
    })).isRequired,
};

export default PostImages;
