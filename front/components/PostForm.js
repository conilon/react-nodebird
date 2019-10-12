import React from 'react';
import { Form, Input, Button } from 'antd';

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

const PostForm = () => {
    return (
        <Form encType="multipart/form-data" style={{ margin: '10px 0 20px' }}>
            <Input.TextArea maxLength={140} placeholder="어떤 신기한 일이 있었나요?" />
            <div>
                <input type="file" multiple hidden />
                <Button>이미지 업로드</Button>
                <Button type="primary" htmlType="submit" style={{ float: 'right' }}>짹짹</Button>
            </div>
            <div>
                {dummy.imagePaths.map((v) => {
                    return (
                        <div key={v} style={{ display: 'inline-block'}}>
                            <img src={`http://localhost:3065/` + v} alt={v} style={{ width: '200px' }} />
                            <div>
                                <Button>제거</Button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Form>
    );
};

export default PostForm;