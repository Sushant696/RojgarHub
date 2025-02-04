import { Editor } from "@tinymce/tinymce-react";

interface RichTextProps {
  value: string;
  onChange: (content: string) => void;
  height?: number;
  title?: string;
}

const RichText: React.FC<RichTextProps> = ({
  value,
  onChange,
  height = 300,
  title = "",
}) => {
  const handleEditorChange = (content: string) => {
    onChange(content);
  };
  return (
    <>
      <h4>{title}</h4>
      <Editor
        apiKey={process.env.EDITOR_API}
        value={value}
        onEditorChange={handleEditorChange}
        init={{
          height,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
            "link",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            " link | removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
    </>
  );
};

export default RichText;
