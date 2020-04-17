import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';

import 'tui-editor/dist/tui-editor-contents.css';
import 'highlight.js/styles/github.css';
import '../../css/note/noteContent.css';

import Viewer from 'tui-editor/dist/tui-editor-Viewer-all';

let tuiViewer;
const NoteContent = ({ content }) => {
    useEffect(() => {
        tuiViewer = new Viewer({
            el: document.querySelector('#viewerSection'),
            height: '500px',
            initialValue: `${content}`,
            exts: [
                {
                    name: 'chart',
                    minWidth: 100,
                    maxWidth: 400,
                    minHeight: 100,
                    maxHeight: 300,
                },
                'uml',
                'table',
            ],
        });
    }, [tuiViewer]);

    return (
        <Row gutter={[15, 15]}>
            <Col span={6} xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                <div id="viewerSection" />
            </Col>
        </Row>
    );
};

NoteContent.propTypes = {
    content: PropTypes.any.isRequired,
};

export default NoteContent;
