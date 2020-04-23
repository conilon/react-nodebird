import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { Row, Col, Table } from 'antd';

import MyError from '../_error';
import NoteLayout from '../../src/note/container/NoteLayout';

import { NOTE_ALL_LIST_REQUEST } from '../../reducers/note';

import '../../css/note/noteMain.css';

const Main = () => {
  const { data } = useSelector((state) => state.note);
  
  const tableName = Array.from(Array(data.length), () => []);
  const tableData = Array.from(Array(data.length), () => []);

  data.map((n, ni) => {
    tableName[ni].push({ title: 
      <Link 
        key={n.id} 
        href={{ pathname: '/note/category', query: { category: n.name } }} 
        as={`/note/category/${n.name}/1`}
      >
        <a>{n.name}({n.count})</a>
      </Link>, 
      dataIndex: 'title', 
      key: `${n.name}`, 
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

  const table = tableName.map((v, i) => (
    <Col key={v[0].key} span={6} xs={24} sm={12} md={12} lg={12} xl={8} xxl={8}>
      <Table columns={tableName[i]} dataSource={tableData[i]} pagination={false} size="middle" />
    </Col>
  ));
  
  const layout = (
    <NoteLayout title="note">
      <div className="list">
        <Row gutter={[30, 30]}>
          {table}
        </Row>
      </div>
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
