import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import './index.css';
import { 
    Form,
    Input,
    Icon,
    Row,
    Col,
    Checkbox,
    Button,
    Upload,
} from 'antd';
import axios from 'axios';
import AppLayout2 from '../../../components/AppLayout2';
import { backUrl } from '../../../config/config';
import { UPLOAD_IMAGE_LIST, ADD_PORTFOLIO_REQUEST } from '../../../reducers/portfolio';

axios.defaults.baseURL = `${backUrl}/api`;

const Creation = () => {
    const { TextArea } = Input;
    const [fileList, setFileList] = useState([]);
    const [company, setCompany] = useState('');
    const [website, setWebsite] = useState('');
    const [content, setContent] = useState('');
    const [visible, setVisible] = useState(true);
    const { me } = useSelector((state) => state.user);
    const { fileLists, addedPortfolio } = useSelector((state) => state.portfolio);
    const dispatch = useDispatch();

    useEffect(() => {
        if (addedPortfolio.length) {
            alert('포트폴리오가 정상적으로 등록되었습니다.');
            Router.push('/portfolio/management');
        }
    }, [addedPortfolio]);

    useEffect(() => {
        console.log('fileLists: ', fileLists);
    }, [fileLists]);

    useEffect(() => {
        console.log('fileList: ', fileList);
    }, [fileList]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        console.log(e);
        console.log(company);
        console.log(website);
        console.log(fileLists);
        console.log(content);
        console.log(visible);
        if (!me) {
            // return alert('로그인이 필요합니다.');
        }
        if (!content || !content.trim()) {
            // return alert('게시글을 작성하세요.');
        }
        const formData = new FormData();
        // [].forEach.call(fileLists, (f) => {
        //     console.log('f: ', f);
        //     formData.append('image', f.uid);
        // });
        // fileLists.forEach((i) => {
        //     console.log('i: ', i);
        //     formData.append('uid', i.uid);
        //     formData.append('name', i.name);
        // });
        Array.from(fileLists).forEach((v) => {
            formData.append('uid', v.uid);
            formData.append('filename', v.filename);
            formData.append('name', v.name);
            formData.append('url', v.url);
        });
        formData.append('company', company);
        formData.append('website', website);
        formData.append('content', content);
        formData.append('visible', visible);
        return dispatch({
            type: ADD_PORTFOLIO_REQUEST,
            data: formData,
        });
    }, [company, website, fileLists, content, visible]);

    const onChangeCompany = useCallback((e) => {
        setCompany(e.target.value);
    }, [company]);

    const onChangeWebsite = useCallback((e) => {
        setWebsite(e.target.value);
    }, [website]);

    const onChangeText = useCallback((e) => {
        setContent(e.target.value);
    }, [content]);

    const onChangeVisible = useCallback((e) => {
        setVisible(e.target.checked);
    }, [visible]);

    const handleChange = useCallback((e) => {
        switch (e.file.status) {
            case 'uploading': {
                break;
            }
            case 'done': {
                break;
            }
            case 'removed': {
                setFileList(fileList.filter((v) => v.uid !== e.file.uid));
                break;
            }
            case 'error': {
                console.log('error: ', e);
                break;
            }
            default: {
                break;
            }
        }
    }, [fileList]);

    const onProgress = ({ percent }, file) => {
        console.log('onProgress', percent, file);
    };

    const onSuccess = (response, file) => {
        console.log('onSuccess', response, file);
        const data = {
            uid: file.uid,
            name: response.originalname,
            filename: response.filename,
            status: 'done',
            url: response.url,
            thumbUrl: response.thumbUrl,
        };
        setFileList([...fileList, data]);
        dispatch({
            type: UPLOAD_IMAGE_LIST,
            data,
        });
    };

    const onError = (e) => {
        console.log('onError', e);
    };

    const handleCustomRequest = ({ file }) => {
        const formData = new FormData();
        formData.append('image', file);
        
        axios.post('/portfolio/imagess', formData, {
            withCredentials: true,
            onUploadProgress: ({ total, loaded }) => {
                onProgress({ percent: Math.round((loaded / total) * 100).toFixed(2) }, file);
            },
        })
        .then(({ data: response }) => {
            onSuccess(response, file);
        })
        .catch(onError);
    };

    const props = {
        fileList,
        onChange: handleChange,
        customRequest: handleCustomRequest,
        listType: 'picture',
        showUploadList: {
            showDownloadIcon: false,
        },
        className: 'upload-list-inline',
    };

    const formItemLayout = {
        labelCol: {
            xs: { span: 12 },
            sm: { span: 7 },
            md: { span: 5 },
            lg: { span: 5 }, 
            xl: { span: 5 }, 
            xxl: { span: 5 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 14 },
            md: { span: 16 },
            lg: { span: 16 },
            xl: { span: 16 },
            xxl: { span: 16 },
        },
    };

    const tailFormItemLayout = {
        wrapperCol: {
            xs: { span: 5, offset: 12 },
            sm: { span: 5, offset: 7 },
            md: { span: 5, offset: 5 },
            lg: { span: 5, offset: 5 },
            xl: { span: 5, offset: 5 },
            xxl: { span: 5, offset: 5 },
        },
    };

    if (addedPortfolio.length) {
        return null;
    }

    return (
        <AppLayout2>
            <Row className="creation">
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Form onSubmit={handleSubmit} encType="multipart/form-data" {...formItemLayout}>
                        <Form.Item label="회사명">
                            <Input value={company} onChange={onChangeCompany} placeholder="회사명" />
                        </Form.Item>
                        <Form.Item label="웹사이트">
                            <Input value={website} onChange={onChangeWebsite} />
                        </Form.Item>
                        <Form.Item label="이미지">
                            <Upload {...props}>
                                <Button>
                                    <Icon type="upload" /> Upload
                                </Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item label="내용">
                            <TextArea value={content} onChange={onChangeText} rows={4} />
                        </Form.Item>
                        <Form.Item label="노출 여부">
                            <Checkbox onChange={onChangeVisible} checked={visible} />
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">등록</Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </AppLayout2>
    );
};

Creation.getInitialProps = async () => {
    
};

export default Creation;
