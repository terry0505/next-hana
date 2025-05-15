import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { useRef, useEffect } from "react";

type Props = {
  content: string;
  setContent: (value: string) => void;
};

export default function ToastEditor({ content, setContent }: Props) {
  const editorRef = useRef<Editor>(null);

  const handleChange = () => {
    const markdown = editorRef.current?.getInstance().getMarkdown();
    if (markdown) setContent(markdown);
  };

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.getInstance().setMarkdown(content || "");
    }
  }, [content]);

  return (
    <Editor
      initialValue={content || ""}
      previewStyle="vertical"
      height="400px"
      initialEditType="markdown"
      useCommandShortcut={true}
      ref={editorRef}
      onChange={handleChange}
    />
  );
}
