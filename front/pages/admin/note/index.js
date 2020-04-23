import React, { useEffect, useCallback, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Router from 'next/router';
import { Row, Col, Button, Pagination, Table } from 'antd';

import NoteLayout from '../../../src/note/container/NoteLayout';
import NoteList from '../../../src/admin/note/component/NoteList';
import { ADMIN_NOTE_LIST_REQUEST } from '../../../reducers/note';

const Main = ({ page }) => {
  const { data, count } = useSelector((state) => state.note);

  const columns = [
    {
      title: 'title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'createdAt',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
  ];

  const dataSource = data.map((v) => ({
    key: v.id, 
    title: v.title, 
    category: v.Category ? v.Category.name : 'empty', 
    createdAt: v.createdAt.substr(0, 10),
  }));

  const onChangePage = useCallback((p) => {
    Router.push({ pathname: '/admin/note', query: { page: p } }, `/admin/note/${p}`);
  }, [page]);

  const onClickNote = useCallback((e) => {
    const id = e.currentTarget.dataset.rowKey;
    Router.push({ pathname: '/admin/note/edit', query: { id } }, `/admin/note/edit/${id}`);
  }, []);

  useLayoutEffect(() => {
    const els = document.querySelectorAll('.ant-table-row');
    [].forEach.call(els, (el) => el.addEventListener('click', onClickNote));
    return () => {
      [].forEach.call(els, (el) => el.removeEventListener('click', onClickNote));
    };
  });

  return (
    <div>
      <NoteLayout title="test">
        {/* <NoteList data={data} count={count} page={page} onChangePage={onChangePage} /> */}
        <Row>
          <Table dataSource={dataSource} columns={columns} pagination={false} onClick={onClickNote} />
        </Row>
        <Row>
          {data && (
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} style={{ padding: '24px', textAlign: 'center' }}>
              <Pagination onChange={onChangePage} defaultCurrent={parseInt(page, 10)} pageSize={10} total={parseInt(count, 10)} />
            </Col>
          )}
        </Row>
      </NoteLayout>
    </div>
  );
};

Main.getInitialProps = async (context) => {
  const { page } = context.query;
  context.store.dispatch({
    type: ADMIN_NOTE_LIST_REQUEST,
    page,
  });
  return { page };
};

Main.propTypes = {
  page: PropTypes.number.isRequired,
};

export default Main;
