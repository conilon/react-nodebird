import React, { useCallback, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { Row, Col, Pagination, Table } from 'antd';

// import NoteLayout from '../../../src/note/container/NoteLayout';
// import NoteList from '../../../src/admin/note/component/NoteList';
import { ADMIN_CATEGORY_PAGE_LIST_REQUEST } from '../../../reducers/category';

const Main = ({ page }) => {
  const { rows, count } = useSelector((state) => state.category.data);

  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'content',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: 'visible',
      dataIndex: 'visible',
      key: 'visible',
    },
    {
      title: 'createdAt',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
  ];

  const dataSource = rows && rows.map((v) => ({
    key: v.id, 
    name: v.name,
    content: v.content,
    visible: v.visible,
    createdAt: v.createdAt.substr(0, 10),
  }));

  const onChangePage = useCallback((p) => {
    Router.push({ pathname: '/admin/category', query: { page: p } }, `/admin/category/${p}`);
  }, [page]);

  const onClickCategory = useCallback((e) => {
    const id = e.currentTarget.dataset.rowKey;
    Router.push({ pathname: '/admin/category/edit', query: { id } }, `/admin/category/edit/${id}`);
  }, []);

  useLayoutEffect(() => {
    const els = document.querySelectorAll('.ant-table-row');
    [].forEach.call(els, (el) => el.addEventListener('click', onClickCategory));
    return () => {
      [].forEach.call(els, (el) => el.removeEventListener('click', onClickCategory));
    };
  });

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} pagination={false} onClick={onClickCategory} />
      <Row>
        {rows && (
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} style={{ padding: '24px', textAlign: 'center' }}>
            <Pagination onChange={onChangePage} defaultCurrent={parseInt(page, 10)} pageSize={10} total={parseInt(count, 10)} />
          </Col>
        )}
      </Row>
    </div>
  );
};

Main.getInitialProps = async (context) => {
  const { page } = context.query;
  context.store.dispatch({
    type: ADMIN_CATEGORY_PAGE_LIST_REQUEST,
    page,
  });
  return { page };
};

Main.propTypes = {
  page: PropTypes.string.isRequired,
};

export default Main;
