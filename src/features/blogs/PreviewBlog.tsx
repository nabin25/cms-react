import type { IBlog } from "../../types/blog";

const PreviewBlog = ({
  content,
  blogData,
}: {
  content?: string;
  blogData?: IBlog;
}) => {
  if (blogData) {
    return (
      <>
        <div className="h-40 w-full overflow-hidden flex items-center justify-center rounded-md ">
          <img
            alt={blogData.title}
            className="h-full object-contain"
            src={blogData?.cover_image}
          />
        </div>
        <div
          className="ql-editor"
          dangerouslySetInnerHTML={{ __html: blogData.content }}
        ></div>
      </>
    );
  }
  return (
    <>
      <>
        {content && (
          <div
            className="ql-editor"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
        )}
      </>
    </>
  );
};

export default PreviewBlog;
