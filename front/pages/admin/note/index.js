import React, { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Router from 'next/router';

import NoteLayout from '../../../src/note/container/NoteLayout';
import AdminNoteList from '../../../src/admin/note/component/AdminNoteList';

import { ADMIN_NOTE_LIST_REQUEST } from '../../../reducers/note';

const Main = ({ page }) => {
  const { data, count } = useSelector((state) => state.note);

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

  useEffect(() => {
    const els = document.querySelectorAll('.ant-table-row');
    [].forEach.call(els, (el) => el.addEventListener('click', onClickNote));
    return () => {
      [].forEach.call(els, (el) => el.removeEventListener('click', onClickNote));
    };
  });

  return (
    <NoteLayout title="관리자 노트">
      <AdminNoteList dataSource={dataSource} page={page} count={count} onChangePage={onChangePage} />
    </NoteLayout>
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
