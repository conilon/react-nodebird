import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Router from 'next/router';

import MyError from '../_error';
import NoteLayout from '../../src/note/container/NoteLayout';
import NoteList from '../../src/note/component/NoteList';

import { NOTE_LIST_REQUEST } from '../../reducers/note';

const Note = ({ category, page }) => {
  const { data, count } = useSelector((state) => state.note.list);

  const onChangePage = useCallback((p) => {
    Router.push({ pathname: '/note/category', query: { category, page: p } }, `/note/${category}/${p}`);
  }, [category, page]);
  
  const layout = (
    <NoteLayout title={category}>
      { data && <NoteList data={data} count={count} page={page} onChangePage={onChangePage} /> }
    </NoteLayout>
  );

  const content = data ? layout : <MyError statusCode={404} />;

  return (
    <div>
      {data && content}
    </div>
  );
};

Note.getInitialProps = async (context) => {
  console.log('Note.getInitialProps');
  const { category, page } = context.query;
  context.store.dispatch({
    type: NOTE_LIST_REQUEST,
    category,
    page,
  });
  return { category, page };
};

Note.propTypes = {
  category: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
};

export default Note;
