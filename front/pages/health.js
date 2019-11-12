import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import { Icon, Row, Col, Layout, Menu, Input } from 'antd';

const Health = () => {
    const { Header, Content } = Layout;
    const [visible, setVisible] = useState(false);
    const onVisible = useCallback(() => {
        setVisible((prev) => !prev);
    }, [visible]);

    const text = 'Health 페이지';
    return (
        <Layout>
            <Row>
                <Col xs={0} sm={0} md={24} lg={24} xl={24} xxl={24}>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Menu mode="horizontal" style={{ lineHeight: '80px' }}>
                            <Menu.Item key="1">
                                <Link href="/"><a>THMSY</a></Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link href="/portfolio/1"><a>포트폴리오</a></Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Link href="/profile"><a>프로필</a></Link>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Link href="/health"><a>헬스</a></Link>
                            </Menu.Item>
                            <Menu.Item key="5" style={{ float: 'right' }}>
                                <Input.Search style={{ verticalAlign: 'middle' }} />
                            </Menu.Item>
                        </Menu>
                    </Header>
                </Col>
                <Col xs={24} sm={24} md={0} lg={0} xl={0} xxl={0}>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Row>
                            <Col span={8} offset={8} style={{ textAlign: 'center' }}>
                                <Link href="/"><a>THMSY</a></Link>
                            </Col>
                            <Col span={7} pull={1} style={{ textAlign: 'right' }}>
                                <Icon type="menu" onClick={onVisible} style={{ verticalAlign: 'middle', fontSize: '30px' }} />
                            </Col>
                        </Row>
                    </Header>
                    <Content>
                        {visible && (
                            <Row>
                                <Col xs={24} sm={24} md={0} lg={0} xl={0} xxl={0}>
                                    <Menu mode="inline">
                                        <Menu.Item key="25">
                                            <Input.Search style={{ verticalAlign: 'middle' }} />
                                        </Menu.Item>
                                        <Menu.Item key="22">
                                            <Link href="/portfolio"><a>포트폴리오</a></Link>
                                        </Menu.Item>
                                        <Menu.Item key="23">
                                            <Link href="/profile"><a>프로필</a></Link>
                                        </Menu.Item>
                                        <Menu.Item key="4">
                                            <Link href="/health"><a>헬스</a></Link>
                                        </Menu.Item>
                                    </Menu>
                                </Col>
                            </Row>
                        )}
                    </Content>
                </Col>
            </Row>
            <Row>
                <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                    {text}
                </Content>
            </Row>
        </Layout>
    );
};

Health.getInitialProps = async () => {
    
};

Health.propTypes = {
    
};

export default Health;
