import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Row, Col, Pagination } from 'antd';

import '../style/noteList.css';

const NoteList = ({ data, count, page, onChangePage }) => {
  const result = data.length;

  return (
    <div className="note">
      <Row>
        {result && data.map((v) => (
          <Col key={v.id} xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <div className="list">
              <div className="title">
                <Link href={{ pathname: '/note/view', query: { id: v.id } }} as={`/note/view/${v.id}`}>
                  <a>{v.title}</a>
                </Link>
              </div>
              <div className="tag">
                {v.tag.map((t) => (
                  <Link key={t.id} href={{ pathname: '/note/tag', query: { tag: t.name } }} as={`/note/tag/${t.name}/${1}`}>
                    <a>#{`${t.name}`}</a>
                  </Link>
                ))}
              </div>
              <div className="createdAt">
                {v.createdAt.substr(0, 10).replace(/-/gi, '.')}
              </div>
            </div>
          </Col>
        ))}
      </Row>
      <Row>
        {result && (
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} style={{ padding: '24px', textAlign: 'center' }}>
            <Pagination onChange={onChangePage} defaultCurrent={page} pageSize={24} total={count} />
          </Col>
        )}
      </Row>
    </div>
  );
};

NoteList.propTypes = {
  data: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
};

export default memo(NoteList);
