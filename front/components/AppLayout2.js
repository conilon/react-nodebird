import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import Header from './Header';

const AppLayout2 = ({ children }) => {
    const { Content } = Layout;

    return (
        <Layout style={{ minWidth: '360px', backgroundColor: '#fff' }}>
            <Content>
                <Header />
            </Content>
            <Content style={{ width: '100%', maxWidth: '1200px', margin: '24px auto 0', padding: '2%' }}>
                {children}
            </Content>
        </Layout>
    );
};

AppLayout2.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AppLayout2;
