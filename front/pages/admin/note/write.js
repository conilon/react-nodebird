import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import NoteWrite from '../../../src/admin/note/component/NoteWrite';

const Write = () => {
    const { data: category } = useSelector((state) => state.category.list);
    
    return (
        <div>
            {category[0] && <NoteWrite pCategory={category} />}
        </div>
    );
};

export default Write;
