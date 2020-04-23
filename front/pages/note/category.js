import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Router from 'next/router';

import MyError from '../_error';
import NoteLayout from '../../src/note/container/NoteLayout';
import NoteList from '../../src/note/component/NoteList';

import { NOTE_LIST_REQUEST } from '../../reducers/note';

const Category = ({ category, page }) => {
  const { data, count } = useSelector((state) => state.note);

  const onChangePage = useCallback((p) => {
    Router.push({ pathname: '/note/category', query: { category, page: p } }, `/note/category/${category}/${p}`);
  }, [category, page]);
  
  const layout = (
    <NoteLayout title={category}>
      <NoteList data={data} count={count} page={page} onChangePage={onChangePage} />
    </NoteLayout>
  );

  const result = data ? layout : <MyError statusCode={404} />;

  return (
    <>
      {result}
    </>
  );
};

Category.getInitialProps = async (context) => {
  const { category, page = 1 } = context.query;
  context.store.dispatch({
    type: NOTE_LIST_REQUEST,
    category,
    page,
  });
  return { category, page: parseInt(page, 10) };
};

Category.propTypes = {
  category: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};

export default Category;
