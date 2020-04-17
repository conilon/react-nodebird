import React, { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Router from 'next/router';

import MyError from '../_error';
import NoteLayout from '../../src/note/container/NoteLayout';
import NoteList from '../../src/note/component/NoteList';

import { NOTE_TAG_REQUEST } from '../../reducers/note';

import '../../css/note/noteContent.css';

const Tag = ({ tag, page }) => {
  const { data, count } = useSelector((state) => state.note.tag);

  const onChangePage = useCallback((p) => {
      Router.push({ pathname: '/note/view', query: { tag, page: p } }, `/note/view/${p}`);
  }, [tag, page]);
  
  const layout = (
      <NoteLayout title={tag}>
          <NoteList data={data} count={count} page={page} onChangePage={onChangePage} />
      </NoteLayout>
  );

  const content = data ? layout : <MyError statusCode={404} />;

  return (
      <div>
          {data && content}
      </div>
  );
};

Tag.getInitialProps = async (context) => {
    console.log('Tag.getInitialProps');
    const { tag, page } = context.query;
    context.store.dispatch({
        type: NOTE_TAG_REQUEST,
        tag,
        page,
    });
    return { tag, page };
};

Tag.propTypes = {
  tag: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
};

export default Tag;
