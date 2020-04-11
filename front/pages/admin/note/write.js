import React, { useEffect } from 'react';

const ToastUI = () => {
    useEffect(() => {
        const Editor = require('tui-editor/dist/tui-editor-Editor-all');

        require('tui-color-picker/dist/tui-color-picker.min');
        require('tui-editor/dist/tui-editor-extColorSyntax');
        require('codemirror/lib/codemirror.css');
        require('tui-editor/dist/tui-editor.css');
        require('tui-editor/dist/tui-editor-contents.css');
        require('highlight.js/styles/github.css');
        require('tui-color-picker/dist/tui-color-picker.min.css');

        const toastEditor = new Editor({
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
                addImageBlobHook(blob) {
                    console.log('blob: ', blob);
                    return false;
                },
            },
            events: {
                change() {

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
        toastEditor.setMarkdown();
    }, []);

    return (
        <div id="toastEditor">
            <div id="editSection" />
        </div>
    );
};

export default ToastUI;
