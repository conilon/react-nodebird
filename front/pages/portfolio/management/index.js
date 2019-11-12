import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { Layout, Row, Col, Button, Table, Pagination } from 'antd';
import AppLayout2 from '../../../components/AppLayout2';
import { LOAD_MAIN_PORTFOLIOS_REQUEST, TOGGLE_PORTFOLIO_REQUEST } from '../../../reducers/portfolio';

const Management = () => {
    const { Content } = Layout;
    const { portfolioLists } = useSelector((state) => state.portfolio);
    const dispatch = useDispatch();

    const onClickVisible = (portfolioId, visible) => () => {
        dispatch({
            type: TOGGLE_PORTFOLIO_REQUEST,
            portfolioId,
            visible,
        });
    };

    const onChangePaination = (e) => {
        console.log('onChangePaination: ', e);
    };

    const columns = [
        {
            title: 'company',
            dataIndex: 'company',
            key: 'company',
            width: '35%',
            ellipsis: true,
        },
        {
            title: 'website',
            dataIndex: 'website',
            key: 'website',
            width: '35%',
            ellipsis: true,
        },
        {
            title: 'visible',
            dataIndex: 'visible',
            key: 'visible',
            width: '30%',
            align: 'center',
            ellipsis: true,
        },
    ];

    const data = portfolioLists.map((v, i) => ({
        key: i.toString(),
        company: v.company,
        website: v.website,
        content: v.content,
        visible: (
            <div>
                <Button type="primary" onClick={onClickVisible(v.id, v.visible)}>{v.visible ? '노출' : '비노출'}</Button>
                <Link href={{ pathname: '/portfolio/management/modification', query: { id: v.id } }} as={`/portfolio/management/modification/${v.id}`}>
                    <a><Button type="primary">수정</Button></a>
                </Link>
            </div>
        ),
    }));

    return (
        <AppLayout2>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Content style={{ width: '100%', margin: '24px auto 24px', padding: '24px', textAlign: 'center' }}>
                        <Link href="/portfolio/management/creation">
                            <a><Button type="primary" style={{ float: 'right' }}>포트폴리오 등록</Button></a>
                        </Link>
                    </Content>
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Content style={{ width: '100%', margin: '24px auto 24px', padding: '24px', textAlign: 'center' }}>
                        <Table pagination={false} columns={columns} dataSource={data} />
                    </Content>
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Content style={{ width: '100%', margin: '24px auto 24px', padding: '24px', textAlign: 'center' }}>
                        <Pagination onChange={onChangePaination} defaultCurrent={1} pageSize={12} total={12} />
                    </Content>
                </Col>
            </Row>
        </AppLayout2>
    );
};

Management.getInitialProps = async (context) => {
    context.store.dispatch({
        type: LOAD_MAIN_PORTFOLIOS_REQUEST,
    });
};

Management.propTypes = {
    
};

export default Management;
