import ReactQuill from "react-quill-new";

import "react-quill-new/dist/quill.snow.css";
import { cn } from "../../../lib/utils";

interface QuillEditorProps extends ReactQuill.ReactQuillProps {
  error?: string;
  label?: React.ReactNode;
  className?: string;
  toolbarPosition?: "top" | "bottom";
}

export default function QuillEditor({
  id,
  label,
  error,
  className,
  toolbarPosition = "top",
  ...props
}: QuillEditorProps) {
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ["clean"],
    ],
  };

  return (
    <div className={cn(className)}>
      {label && <label className={cn("mb-1.5 block")}>{label}</label>}
      <ReactQuill
        theme="snow"
        modules={quillModules}
        className={cn(
          "react-quill",
          toolbarPosition === "bottom" && "react-quill-toolbar-bottom relative",
          className
        )}
        {...props}
      />
      {error && <p>{error}</p>}
    </div>
  );
}
