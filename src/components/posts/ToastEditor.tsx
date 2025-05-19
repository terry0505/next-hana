'use client';

import dynamic from 'next/dynamic';
import { useRef, useEffect } from 'react';
import { uploadImage } from '@/lib/firebase';
import toastr from 'toastr';

const Editor = dynamic(
  () => import('@toast-ui/react-editor').then((mod) => mod.Editor),
  {
    ssr: false,
  }
);

type Props = {
  content: string;
  setContent: (value: string) => void;
  editorRef: React.RefObject<any>;
};

export default function ToastEditor({ content, setContent, editorRef }: Props) {
  const handleChange = () => {
    const markdown = editorRef.current?.getInstance().getMarkdown();
    if (markdown) setContent(markdown);
  };

  useEffect(() => {
    editorRef.current?.getInstance().setMarkdown(content || '');
  }, [content, editorRef]);

  return (
    <Editor
      initialValue={content || ''}
      previewStyle='vertical'
      height='400px'
      initialEditType='markdown'
      useCommandShortcut={true}
      ref={editorRef}
      onChange={handleChange}
      hooks={{
        addImageBlobHook: async (
          blob: File,
          callback: (url: string, altText: string) => void
        ) => {
          try {
            const imageUrl = await uploadImage(blob);
            callback(imageUrl, 'image');
          } catch (error) {
            toastr.options = {
              positionClass: 'toast-bottom-center',
              timeOut: 3000,
            };
            if (error instanceof Error) {
              toastr.error(error.message);
            } else {
              toastr.error('이미지 업로드에 실패했습니다.');
            }
          }
        },
      }}
    />
  );
}