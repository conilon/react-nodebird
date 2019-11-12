import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { Layout, Row, Col, Icon, Menu, Input } from 'antd';

const SmallHeaderMenu = () => {
    const { Header, Content } = Layout;
    const [visible, setVisible] = useState(false);

    const onVisible = useCallback(() => {
        setVisible((prev) => !prev);
    }, [visible]);

    return (
        <Header style={{ background: '#fff', padding: 0 }}>
            <Row>
                <Col span={8} offset={8} style={{ textAlign: 'center' }}>
                    <Link href="/"><a>THMSY</a></Link>
                </Col>
                <Col span={7} pull={1} style={{ textAlign: 'right' }}>
                    <Icon type="menu" onClick={onVisible} style={{ verticalAlign: 'middle', fontSize: '30px' }} />
                </Col>
            </Row>
            <Content>
                {visible && (
                    <Row>
                        <Col xs={24} sm={24} md={0} lg={0} xl={0} xxl={0}>
                            <Menu mode="inline">
                                <Menu.Item key="25111">
                                    <Input.Search style={{ verticalAlign: 'middle' }} />
                                </Menu.Item>
                                <Menu.Item key="22111">
                                    <Link href="/portfolio"><a>포트폴리오</a></Link>
                                </Menu.Item>
                                <Menu.Item key="23111">
                                    <Link href="/profile"><a>프로필</a></Link>
                                </Menu.Item>
                                <Menu.Item key="41111">
                                    <Link href="/health"><a>헬스</a></Link>
                                </Menu.Item>
                            </Menu>
                        </Col>
                    </Row>
                )}
            </Content>
        </Header>
    );
};

export default SmallHeaderMenu;
