import type { IAuthor } from "../../types/author";
import type { IBlog } from "../../types/blog";
import { calculateAverageReadTime } from "../../utils/average-read-time";

const PreviewBlog = ({
  content,
  blogData,
}: {
  content?: string;
  blogData?: IBlog;
}) => {
  if (blogData) {
    const tags: string[] = JSON.parse(blogData.tags);
    const authorData: IAuthor = JSON.parse(blogData.author);
    return (
      <>
        <div className="flex justify-end items-center gap-2 mt-1">
          <div className="flex justify-end gap-2 items-end">
            <img
              className="w-8 aspect-square rounded-full"
              src={authorData.avatar}
              alt={authorData.name}
            />
            <p>{authorData?.name}</p>
          </div>
        </div>
        <div className="h-40 w-full overflow-hidden flex items-center justify-between rounded-md ">
          <img
            alt={blogData.title}
            className="h-full object-contain"
            src={blogData?.cover_image}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 text-xs px-2 py-0.5 dark:bg-gray-800 rounded-md"
            >
              {tag}
            </span>
          ))}
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
