import React from 'react';
import { Row, Col } from 'antd';
import AppLayout2 from '../../components/AppLayout2';

const Detail = () => {
    const text = '포트폴리오 상세 페이지';
    return (
        <AppLayout2>
            <Row style={{ width: '100%', maxWidth: '1200px', margin: '24px auto 0', padding: '24px' }}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    {text}
                </Col>
            </Row>
        </AppLayout2>
    );
};

Detail.getInitialProps = async () => {
    
};

Detail.propTypes = {
    
};

export default Detail;
