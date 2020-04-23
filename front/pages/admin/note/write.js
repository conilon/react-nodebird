import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import NoteWrite from '../../../src/admin/note/component/NoteWrite';

import { ADMIN_CATEGORY_LIST_REQUEST } from '../../../reducers/category';

const Write = () => {
  const { rows: pCategory } = useSelector((state) => state.category.data);
  return (
    <div>
      {pCategory[0] && <NoteWrite pCategory={pCategory} />}
    </div>
  );
};

Write.getInitialProps = async (context) => {
  context.store.dispatch({
    type: ADMIN_CATEGORY_LIST_REQUEST,
  });
};

export default Write;
