import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Row, Col, Card, Pagination } from 'antd';

import '../../../css/note/noteList.css';

const NoteList = ({ data, count, page, onChangePage }) => {
    return (
        <div className="list">
            <Row gutter={[15, 15]}>
                {data[0] && data.map((v) => (
                    <Col key={v.id} span={6} xs={24} sm={24} md={24} lg={8} xl={6} xxl={6} style={{ padding: '0' }}>
                        <div style={{ padding: '2rem 0', borderTop: '1px solid #bbb', borderBottom: '1px solid #bbb' }}>
                            <Link
                                key={v.id}
                                href={{ pathname: '/note/view', query: { category: v.category.name, id: v.id } }} 
                                as={`/note/${v.category.name}/view/${v.id}`}
                            >
                                <a>
                                    <div className="note-title" style={{ fontSize: '2rem', padding: '10px' }}>{v.title}</div>
                                </a>
                            </Link>
                            {v.tag.map((t) => (
                                <Link
                                    key={t.id}
                                    href={{ pathname: '/note/tag', query: { tag: t.name } }} 
                                    as={`/note/tag/${t.name}/1`}
                                >
                                    <a style={{ padding: '5px 10px', marginRight: '5px', borderRadius: '50px', backgroundColor: '#fff' }}>
                                        {t.name}
                                    </a>
                                </Link>
                            ))}
                            <div className="note-createAt" style={{ fontSize: '1rem', fontWeight: 'bold', color: '#fff', textAlign: 'right' }}>{v.createdAt.substr(0, 10)}</div>
                        </div>
                        {/* <Card title={v.title} bordered={false}> */}
                        {/* </Card> */}
                        
                    </Col>
                ))}
            </Row>
            <Row>
                {data && (
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} style={{ padding: '24px', textAlign: 'center' }}>
                        <Pagination onChange={onChangePage} defaultCurrent={parseInt(page, 10)} pageSize={24} total={parseInt(count, 10)} />
                    </Col>
                )}
            </Row>
        </div>
    );
};
    

NoteList.propTypes = {
    data: PropTypes.array.isRequired,
    page: PropTypes.string.isRequired,
    // eslint-disable-next-line react/require-default-props
    count: PropTypes.any,
    onChangePage: PropTypes.func.isRequired,
};

export default NoteList;
