import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { NOTE_ADMIN_VIEW_REQUEST } from '../../../reducers/note';

import NoteEdit from '../../../src/admin/note/component/NoteEdit';

const Edit = () => {
    const { data: pData } = useSelector((state) => state.note.view);
    const { data: pCategory } = useSelector((state) => state.category.categories);
    
    return (
        <div>
            {pData && pCategory[0] && <NoteEdit pCategory={pCategory} pData={pData} />}
        </div>
    );
};

Edit.getInitialProps = async (context) => {
    const { row } = context.query;
    context.store.dispatch({
      type: NOTE_ADMIN_VIEW_REQUEST,
      row,
    });
};

export default Edit;
