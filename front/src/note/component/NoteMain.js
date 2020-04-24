import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Table } from 'antd';

import '../style/noteMain.css';

const NoteMain = ({ tableName, tableData }) => {
  const table = tableName.map((v, i) => (
    <Col key={v[0].key} span={6} xs={24} sm={12} md={12} lg={12} xl={8} xxl={8}>
      <Table columns={tableName[i]} dataSource={tableData[i]} pagination={false} size="middle" />
    </Col>
  ));

  return (
    <div className="main">
      <Row gutter={[30, 30]}>
        {table}
      </Row>
    </div>
  );
};

NoteMain.propTypes = {
  tableName: PropTypes.array.isRequired,
  tableData: PropTypes.array.isRequired,
};

export default memo(NoteMain);
