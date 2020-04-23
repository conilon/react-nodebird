import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import MyError from '../_error';
import NoteLayout from '../../src/note/container/NoteLayout';
import NoteContent from '../../src/note/component/NoteContent';

import { NOTE_VIEW_REQUEST } from '../../reducers/note';

import '../../css/note/noteContent.css';

const NoteView = () => {
  const { data } = useSelector((state) => state.note);
  const { title = '' } = data;

  useEffect(() => {
    if (data.content) {
      const Viewer = require('tui-editor/dist/tui-editor-Viewer-all');
      require('tui-editor/dist/tui-editor-contents.css');
      require('highlight.js/styles/github.css');

      const view = document.querySelector('.view');
      const tuiViewer = new Viewer({
        el: document.querySelector('#viewerSection'),
        height: '500px',
        initialValue: `${data.content}`,
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

      view.style.visibility = tuiViewer.markdownValue ? 'visible' : 'hidden';
    }
  }, [data.content]);

  const content = (
    <NoteLayout title={title}>
      <div className="view">
        <NoteContent />
      </div>
    </NoteLayout>
  );
    
  // let view;
  // let viewHeight;
  // useEffect(() => {
  //   view = document.querySelector('.view');
  //   // cssContent = document.querySelector('.content');
  //   viewHeight = window.getComputedStyle(document.querySelector('.content')).getPropertyValue('height');

  //   console.log('viewHeight: ', viewHeight);
  //   console.log('document.body.scrollHeight: ', document.body.scrollHeight);
  //   view.style.height = `${document.body.scrollHeight}px`;
  // }, [view, viewHeight, data.content]);

  const result = data ? content : <MyError statusCode={404} />;
      
  return (
    <>
      {result}
    </>
  );
};

NoteView.getInitialProps = async (context) => {
  const { id } = context.query;
  context.store.dispatch({
    type: NOTE_VIEW_REQUEST,
    id,
  });
};

export default NoteView;
