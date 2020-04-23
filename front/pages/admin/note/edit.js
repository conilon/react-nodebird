import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { NOTE_ADMIN_VIEW_REQUEST } from '../../../reducers/note';

import NoteEdit from '../../../src/admin/note/component/NoteEdit';

const Edit = () => {
  const { data: pData } = useSelector((state) => state.note);
  const { data: pCategory } = useSelector((state) => state.category);
  
  return (
    <div>
      {pData && pCategory && <NoteEdit pCategory={pCategory} pData={pData} />}
    </div>
  );
};

Edit.getInitialProps = async (context) => {
  const { id } = context.query;
  context.store.dispatch({
    type: NOTE_ADMIN_VIEW_REQUEST,
    id,
  });
};

export default Edit;
