import React, { useEffect, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import * as Emoji from 'quill-emoji';
import 'quill-emoji/dist/quill-emoji.css';
import 'react-quill/dist/quill.snow.css';

Quill.register('modules/emoji', Emoji);
const Font = Quill.import('formats/font');
Font.whitelist = ['Monospace'];

Quill.register(Font, true);
const modules = {
  toolbar: [
    [
      //   { size: ['14px', '16px', '18px'] },
      { font: [] },
      { header: [1, 2, false, 'Emojiss'] }
    ],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' }
    ],
    ['link', 'image'],
    ['clean'],
    ['emoji']
  ]
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'emoji'
];

const Editor = (props) => {
  const { content, handleOnChange } = props;

  return (
    <div style={{ minHeight: '500px' }}>
      <ReactQuill
        value={content}
        onChange={(val) => handleOnChange(val)}
        theme="snow"
        modules={{
          ...modules,
          'emoji-toolbar': true,
          'emoji-textarea': true,
          'emoji-shortname': true
        }}
        formats={formats}
        placeholder="Your Content Here"
      ></ReactQuill>
    </div>
  );
};

export default Editor;
