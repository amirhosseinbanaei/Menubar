import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';

export default function TextEditor() {
  return (
    <div dir='rtl'>
      <CKEditor
        editor={ClassicEditor}
        config={{
          alignment: {
            options: ['left', 'right'],
          },
         //  plugins: [Alignment],
         extraPlugins:['alignment'],
          toolbar: [
            'bulletedList',
            'numberedList',
            'undo',
            'redo',
          ],
          heading: {
            options: [
              {
                model: 'paragraph',
                title: 'Paragraph',
                class: 'ck-heading_paragraph',
              },
              {
                model: 'heading1',
                view: 'h1',
                title: 'Heading 1',
                class: 'ck-heading_heading1',
              },
              {
                model: 'heading2',
                view: 'h2',
                title: 'Heading 2',
                class: 'ck-heading_heading2',
              },
            ],
          },
        }}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log('Editor is ready to use!', editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log({ event, editor, data });
        }}
        onBlur={(event, editor) => {
          console.log('Blur.', editor);
        }}
        onFocus={(event, editor) => {
          console.log('Focus.', editor);
        }}
      />
    </div>
  );
}
