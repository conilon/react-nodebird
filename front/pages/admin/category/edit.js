import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { ADMIN_CATEGORY_VIEW_REQUEST } from '../../../reducers/category';

import CategoryEdit from '../../../src/admin/category/component/CategoryEdit';

const Edit = () => {
  const { data: pData } = useSelector((state) => state.category);
  
  return (
    <div>
      {pData.id && <CategoryEdit pData={pData} />}
    </div>
  );
};

Edit.getInitialProps = async (context) => {
  const { id } = context.query;
  context.store.dispatch({
    type: ADMIN_CATEGORY_VIEW_REQUEST,
    id,
  });
};

export default Edit;
