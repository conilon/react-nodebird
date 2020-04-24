import React, { memo } from 'react';
import { Row, Col } from 'antd';

import '../style/noteContent.css';

const NoteContent = () => (
  <Row gutter={[15, 15]}>
    <Col span={6} xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
      <div id="viewerSection" />
    </Col>
  </Row>
);

export default memo(NoteContent);
