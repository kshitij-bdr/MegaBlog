/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Control, Controller } from 'react-hook-form';

interface FormValues {
  title: string;
  slug: string;
  content: string;
  status: string;
}

interface RTEProps {
  name: keyof FormValues; // Use keyof to restrict to valid keys
  control: Control<
    { title: any; slug: any; content: any; status: any; image: any },
    any
  >; // Type the control prop
  label: string;
  defaultValue?: string;
}

export default function RTE({
  name,
  control,
  label,
  defaultValue = '',
}: RTEProps) {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue} // Set default value here
        render={(
          { field: { onChange, value }, fieldState: { error } } // Access value and error
        ) => (
          <>
            <Editor
              value={value} // Use value prop to set editor content
              init={{
                height: 500,
                menubar: true,
                plugins: [
                  'image',
                  'advlist',
                  'autolink',
                  'lists',
                  'link',
                  'image',
                  'charmap',
                  'preview',
                  'anchor',
                  'searchreplace',
                  'visualblocks',
                  'code',
                  'fullscreen',
                  'insertdatetime',
                  'media',
                  'table',
                  'code',
                  'help',
                  'wordcount',
                  'anchor',
                ],
                toolbar:
                  'undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help',
                content_style:
                  'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
              }}
              onEditorChange={onChange}
            />
            {error && <p className="text-red-500">{error.message}</p>}{' '}
            {/* Display error message */}
          </>
        )}
      />
    </div>
  );
}
