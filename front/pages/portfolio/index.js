import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { Layout, Row, Col, Pagination, Card, Tooltip } from 'antd';
import AppLayout2 from '../../components/AppLayout2';
import { LOAD_MAIN_PORTFOLIOS_REQUEST } from '../../reducers/portfolio';

const Portfolio = () => {
    const { Content } = Layout;
    const { Meta } = Card;
    const { portfolioLists } = useSelector((state) => state.portfolio);

    const onChangePaination = (e) => {
        console.log(e);
    };

    return (
        <AppLayout2>
            <Row type="flex" justify="start" align="bottom" gutter={[10, 10]}>
                {portfolioLists.map((v) => (
                    <Col key={v.id} span={6} xs={24} sm={12} md={12} lg={12} xl={6} xxl={6} style={{ textAlign: 'center' }}>
                        <Link href={{ pathname: '/portfolioDetail', query: { id: v.id } }} as={`/portfolio/detail/${v.id}`}>
                            <Card
                                hoverable
                                style={{ width: '100%' }}
                            >
                                <div style={{ width: '100%', height: '210px', backgroundPosition: 'top center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundImage: `url("http://localhost:3065/${v.PortfolioImages[0] && v.PortfolioImages[0].src}")` }} />
                                <Meta 
                                    title={<Tooltip title={v.company}><span style={{ fontSize: '14px' }}>{v.company}</span></Tooltip>} 
                                    description={v.website}
                                    style={{ paddingTop: '30px' }} 
                                />
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Content style={{ width: '80%', margin: '24px auto 24px', padding: '24px', textAlign: 'center' }}>
                        <Pagination onChange={onChangePaination} defaultCurrent={1} pageSize={12} total={12} />
                    </Content>
                </Col>
            </Row>
        </AppLayout2>
    );
};

Portfolio.getInitialProps = async (context) => {
    context.store.dispatch({
        type: LOAD_MAIN_PORTFOLIOS_REQUEST,
    });
};

Portfolio.propTypes = {
    
};

export default Portfolio;
