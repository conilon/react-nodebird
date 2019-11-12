import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import './index.css';
import { 
    Form,
    Input,
    Icon,
    Row,
    Col,
    Button,
    message,
} from 'antd';
import AppLayout2 from '../../components/AppLayout2';
import { LOG_IN_REQUEST } from '../../reducers/user';

const useInput = (initValue = null) => {
    const [value, setter] = useState(initValue);
    const handler = useCallback((e) => {
        setter(e.target.value);
    }, []);
    return [value, handler];
};

const Login = () => {
    const [id, onChangeId] = useInput('');
    const [password, onChangePassword] = useInput('');
    const { me, isLoggingIn, logInErrorReason } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!id && me) {
            alert('이미 로그인이 되어있습니다. 메인페이지로 이동합니다.');
            Router.push('/');
        } else if (id && me) {
            Router.back();
        }
    }, [id && me && me.id]);

    useEffect(() => {
        if (logInErrorReason) {
            message.error(logInErrorReason);
        }
    }, [logInErrorReason]);

    const onSubmitForm = useCallback((e) => {
        e.preventDefault();
        dispatch({
            type: LOG_IN_REQUEST,
            data: {
                userId: id,
                password,
            },
        });
    }, [id, password, logInErrorReason]);

    if (me) {
        return null;
    }

    return (
        <AppLayout2>
            <Row className="login">
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Form onSubmit={onSubmitForm} className="login-form">
                        <Form.Item>
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="아이디"
                                name="user-id"
                                value={id}
                                onChange={onChangeId}
                                required
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="비밀번호"
                                type="password"
                                name="user-password"
                                value={password} 
                                onChange={onChangePassword}
                                required
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={isLoggingIn} className="login-form-button">
                                로그인
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </AppLayout2>
    );
};

Login.getInitialProps = async () => {
    
};

export default Login;
