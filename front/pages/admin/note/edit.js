import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import NoteLayout from '../../../src/note/container/NoteLayout';
import AdminNoteEdit from '../../../src/admin/note/component/AdminNoteEdit';

import { NOTE_ADMIN_VIEW_REQUEST } from '../../../reducers/note';

const Edit = () => {
  const { data: pData } = useSelector((state) => state.note);
  const { data: pCategory } = useSelector((state) => state.category);
  
  return (
    <NoteLayout title={`관리자 노트 에디트 ${pData.id}`}>
      {pData.id && pCategory && <AdminNoteEdit pCategory={pCategory} pData={pData} />}
    </NoteLayout>
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
