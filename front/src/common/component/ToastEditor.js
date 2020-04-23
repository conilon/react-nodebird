import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

let toastEditor;
const ToastEditor = ({ onChangeContent, content }) => {
  const changeEditor = useCallback(() => { 
    onChangeContent(toastEditor.getMarkdown());
  }, [toastEditor]);

  const onError = (error) => {
    console.error('ToastEditorError: ', error);
  };

  useEffect(() => {
    const Editor = require('tui-editor/dist/tui-editor-Editor-all');

    require('tui-color-picker/dist/tui-color-picker.min');
    require('tui-editor/dist/tui-editor-extColorSyntax');
    require('codemirror/lib/codemirror.css');
    require('tui-editor/dist/tui-editor.css');
    require('tui-editor/dist/tui-editor-contents.css');
    require('highlight.js/styles/github.css');
    require('tui-color-picker/dist/tui-color-picker.min.css');
    require('../style/ToastEditor.css');

    toastEditor = new Editor({
      el: document.querySelector('#editSection'),
      previewStyle: 'vertical', // vertical, tab
      height: '400px',
      initialEditType: 'markdown', // markdown, wysiwyg
      exts: [
        {
          name: 'chart',
          minWidth: 100,
          maxWidth: 600,
          minHeight: 100,
          maxHeight: 300,
        },
        'scrollSync',
        'colorSyntax',
        'uml',
        'mark',
        'table',
      ],
      hooks: {
        addImageBlobHook(blob, callback) {
          const formData = new FormData();
          formData.append('file', blob);

          axios.post('/note/upload', formData, {
              withCredentials: true,
          }).then(({ data: response }) => {
              callback(decodeURIComponent(response.url));
          }).catch(onError);
          
          return false;
        },
      },
      events: {
        change() {
          changeEditor();
        },
        click(e) {
          console.log('click', e);
        },
        changeMode(e) {
          console.log('changeMode: ', e);
        },
        blur(e) {
          console.log('blur: ', e);
        },
      },
    });
    toastEditor.setMarkdown(content);
  }, []);

  return (
    <div id="toastEditor">
      <div id="editSection" />
    </div>
  );
};

ToastEditor.propTypes = {
  onChangeContent: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
};

export default ToastEditor;
