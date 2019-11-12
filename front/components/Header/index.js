import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'antd';
import LargeHeaderMenu from './LargeHeaderMenu';
import SmallHeaderMenu from './SmallHeaderMenu';
import { LOG_OUT_REQUEST } from '../../reducers/user';

const Header = () => {
    const { me } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const onLogout = useCallback(() => {
        dispatch({
            type: LOG_OUT_REQUEST,
        });
    }, []);

    return (
        <Row style={{ padding: 0, background: '#fff' }}>
            <Col xs={0} sm={0} md={24} lg={24} xl={24} xxl={24}>
                <LargeHeaderMenu me={me} onLogout={onLogout} />
            </Col>
            <Col xs={24} sm={24} md={0} lg={0} xl={0} xxl={0}>
                <SmallHeaderMenu />
            </Col>
        </Row>
    );
};

export default Header;
