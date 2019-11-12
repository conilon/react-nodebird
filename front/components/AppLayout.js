import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Layout, Menu, Input, Modal } from 'antd';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import UserProfile from '../containers/UserProfile';
import LoginForm from '../containers/LoginForm';

const AppLayout = ({ children }) => {
    const { Header, Content } = Layout;
    const [visible, setVisible] = useState(false);
    const { me } = useSelector((state) => state.user);

    const onSearch = useCallback((value) => {
        Router.push({ pathname: '/hashtag', query: { tag: value } }, `/hashtag/${value}`);
    }, []);

    const showModal = useCallback(() => {
        setVisible(true);
    }, [visible]);

    const handleCancel = useCallback(() => {
        setVisible(false);
    }, [visible]);

    return (
        <Layout>
            <Layout>
                <Header style={{ background: '#fff', padding: 0 }}>
                    <Menu mode="horizontal">
                        <Menu.Item key="1"><Link href="/"><a>THMSY</a></Link></Menu.Item>
                        <Menu.Item key="2"><Link href="/portfolio"><a>포트폴리오</a></Link></Menu.Item>
                        <Menu.Item key="3"><Link href="/profile"><a>프로필</a></Link></Menu.Item>
                        <Menu.Item key="4" onClick={showModal}>{me ? '로그아웃' : '로그인'}</Menu.Item>
                        <Menu.Item key="5">
                            <Input.Search onSearch={onSearch} style={{ verticalAlign: 'middle' }} />
                        </Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                    {children}
                </Content>
            </Layout>
            <Modal title="THMSY" visible={visible} onCancel={handleCancel} footer={null}>
                {me ? <UserProfile /> : <LoginForm />}
            </Modal>
        </Layout>
    );
};

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AppLayout;
