import React, { useCallback } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Menu, Input, Row, Col } from 'antd';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import UserProfile from '../containers/UserProfile';
import LoginForm from '../containers/LoginForm';

const AppLayout = ({ children }) => {
    const { me } = useSelector((state) => state.user);
    
    const onSearch = useCallback((value) => {
        Router.push({ pathname: '/hashtag', query: { tag: value } }, `/hashtag/${value}`);
    }, []);

    return (
        <div>
            <Menu mode="horizontal">
                <Menu.Item key="home"><Link href="/"><a>노드버드</a></Link></Menu.Item>
                <Menu.Item key="profile"><Link href="/profile"><a>프로필</a></Link></Menu.Item>
                <Menu.Item key="mail">
                    <Input.Search enterButton onSearch={onSearch} style={{ verticalAlign: 'middle' }} />
                </Menu.Item>
            </Menu>
            <Row gutter={8}>
                <Col xs={24} md={6}>
                    {me ? <UserProfile /> : <LoginForm />}
                </Col>
                <Col xs={24} md={12}>
                    {children}
                </Col>
                <Col xs={24} md={6}>
                    <Link href="/"><a target="_blank">Made by th</a></Link>
                </Col>
            </Row>
        </div>
    );
};

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AppLayout;
