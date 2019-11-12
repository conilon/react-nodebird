import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Layout, Menu, Dropdown, Icon } from 'antd';

const LargeHeaderMenu = ({ onLogout }) => {
    const { Header } = Layout;
    const { me } = useSelector((state) => state.user);

    const menu = (
        <Menu>
            <Menu.Item key="create">
                <Link href="/portfolio/management"><a>포트폴리오 관리</a></Link>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="account">
                {
                    me 
                    ? <div onClick={onLogout}>로그아웃</div>
                    : <Link href="/login"><a>로그인</a></Link>
                }
            </Menu.Item>
        </Menu>
    );

    return (
        <Header style={{ height: 'auto', padding: 0, borderBottom: '1px solid #e8e8e8', background: '#fff' }}>
            <Menu mode="horizontal" style={{ maxWidth: '1200px', lineHeight: '60px', margin: '0 auto', border: 'none' }}>
                <Menu.Item key="THMSY" style={{ border: 'none' }}>
                    <Link href="/"><a><img src="http://localhost:3060/favicon.ico" alt="log" style={{ maxHeight: '60px' }} /></a></Link>
                </Menu.Item>
                <Menu.Item key="dropdown" style={{ float: 'right', border: 'none' }}>
                    <Dropdown overlay={menu} placement="bottomCenter">
                        <div style={{ height: '60px' }}>
                            <a className="ant-dropdown-link">
                                내 계정 <Icon type="down" />
                            </a>
                        </div>
                    </Dropdown>
                </Menu.Item>
            </Menu>
            <Menu mode="horizontal" style={{ maxWidth: '1200px', margin: '0 auto', border: 'none' }}>
                <Menu.Item key="portfolio">
                    <Link href="/portfolio/1"><a>포트폴리오</a></Link>
                </Menu.Item>
                <Menu.Item key="profile">
                    <Link href="/profile"><a>프로필</a></Link>
                </Menu.Item>
                <Menu.Item key="health">
                    <Link href="/health"><a>헬스</a></Link>
                </Menu.Item>
            </Menu>
        </Header>
    );
};

LargeHeaderMenu.propTypes = {
    onLogout: PropTypes.func.isRequired,
};

export default LargeHeaderMenu;
