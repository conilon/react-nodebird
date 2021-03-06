import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Row, Col, Card, Pagination } from 'antd';

const CategoryList = ({ rows, count, page, onChangePage }) => (
    <div>
        <Row gutter={[15, 15]}>
            {rows && rows.map((v) => (
                <Col key={v.id} span={6} xs={24} sm={12} md={12} lg={8} xl={6} xxl={6}>
                    <Link 
                        key={v.id} 
                        href={{ pathname: '/note/category/view', query: { category: v.Category.name, id: v.id } }} 
                        as={`/note/category/${v.Category.name}/view/${v.id}`}
                    >
                        <a>
                            <Card title={v.title} bordered={false}>
                                <div className="note-createAt">{v.createdAt.substr(0, 10)}</div>
                            </Card>
                        </a>
                    </Link>
                </Col>
            ))}
        </Row>
        <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} style={{ width: '100%%', margin: '24px auto 24px', padding: '24px', textAlign: 'center' }}>
                <Pagination onChange={onChangePage} defaultCurrent={page} pageSize={12} total={count} />
            </Col>
        </Row>
    </div>
);

CategoryList.propTypes = {
    rows: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
};

export default CategoryList;
