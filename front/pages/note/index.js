import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { Row, Col, Table } from 'antd';

import NoteLayout from '../../src/note/container/NoteLayout';

import { NOTE_ALL_LIST_REQUEST } from '../../reducers/note';

import '../../css/note/noteMain.css';

const Note = () => {
    const { data } = useSelector((state) => state.note.list);

    const tableName = Array.from(Array(data.length), () => []);
    const tableData = Array.from(Array(data.length), () => []);
    data.map((n, ni) => {
        tableName[ni].push({ title: 
            <Link 
                key={n.id} 
                href={{ pathname: '/note/category/', query: { category: n.name, page: 1 } }} 
                as={`/note/${n.name}/1`}
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
                    href={{ pathname: '/note/view', query: { category: n.name, id: d.id } }} 
                    as={`/note/${n.name}/view/${d.id}`}
                >
                    <a>{d.title}</a>
                </Link>,
        }));
        return false;
    });

    const table = tableName.map((v, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <Col key={i} span={6} xs={24} sm={12} md={12} lg={12} xl={8} xxl={8}>
            <Table columns={tableName[i]} dataSource={tableData[i]} pagination={false} size="middle" />
        </Col>
    ));

    return (
        <NoteLayout title="note">
            <div className="list">
                <Row gutter={[30, 30]}>
                    {table}
                </Row>
            </div>
        </NoteLayout>
    );
};

Note.getInitialProps = async (context) => {
    context.store.dispatch({
        type: NOTE_ALL_LIST_REQUEST,
    });
};

export default Note;
