import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Pagination, Table } from 'antd';

import '../style/adminNoteList.css';

const NoteList = ({ dataSource, page, count, onChangePage }) => {
  const columns = [
    {
        title: 'title',
        dataIndex: 'title',
        key: 'title',
        width: '80%',
        ellipsis: true,
    },
    {
        title: 'category',
        dataIndex: 'category',
        key: 'category',
        width: '20%',
        ellipsis: true,
    },
    {
        title: 'createdAt',
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: '125px',
        align: 'center',
        ellipsis: true,
    },
];

  return (
    <div className="admin-note">
      <Row>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <Table columns={columns} dataSource={dataSource} pagination={false}>
            {/* <Column
              title="Tags"
              dataIndex="tags"
              key="tags"
              render={tags => (
                <span>
                  {tags.map(tag => (
                    <Tag color="blue" key={tag}>
                      {tag}
                    </Tag>
                  ))}
                </span>
              )}
            /> */}
            {/* <Column
              title="Action"
              key="action"
              render={(text, record) => (
                <span>
                  <a style={{ marginRight: 16 }}>Invite {record.lastName}</a>
                  <a>Delete</a>
                </span>
              )}
            /> */}
          </Table>
        </Col>
      </Row>
      <Row>
        {dataSource && (
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} style={{ padding: '24px', textAlign: 'center' }}>
            <Pagination onChange={onChangePage} defaultCurrent={parseInt(page, 10)} pageSize={10} total={parseInt(count, 10)} />
          </Col>
        )}
      </Row>
    </div>
  );
};

NoteList.propTypes = {
  dataSource: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
};

export default memo(NoteList);
