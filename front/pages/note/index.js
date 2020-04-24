import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';

import MyError from '../_error';
import NoteLayout from '../../src/note/container/NoteLayout';
import NoteMain from '../../src/note/component/NoteMain';

import { NOTE_ALL_LIST_REQUEST } from '../../reducers/note';

const Main = () => {
  const { data } = useSelector((state) => state.note);
  
  const tableName = Array.from(Array(data.length), () => []);
  const tableData = Array.from(Array(data.length), () => []);

  data.map((n, ni) => {
    tableName[ni].push({ 
      key: `${n.name}`, 
      title: 
        <Link 
          key={n.id} 
          href={{ pathname: '/note/category', query: { category: n.name } }} 
          as={`/note/category/${n.name}/1`}
        >
          <a>{n.name}({n.count})</a>
        </Link>, 
      dataIndex: 'title', 
      ellipsis: true,
    });
    n.Notes.map((d) => tableData[ni].push({ 
      key: `${d.createdAt}`, 
      title: 
        <Link 
          key={d.id} 
          href={{ pathname: '/note/view', query: { id: d.id } }} 
          as={`/note/view/${d.id}`}
        >
          <a>{d.title}</a>
        </Link>,
    }));
    return false;
  });
  
  const layout = (
    <NoteLayout title="note">
      <NoteMain tableName={tableName} tableData={tableData} />
    </NoteLayout>
  );

  const result = data ? layout : <MyError statusCode={404} />;

  return (
    <>
      {result}
    </>
  );
};

Main.getInitialProps = async (context) => {
  await context.store.dispatch({
    type: NOTE_ALL_LIST_REQUEST,
  });
};

export default Main;
