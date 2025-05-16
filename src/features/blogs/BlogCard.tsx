import { Eye, SquarePen, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { cn } from "../../lib/utils";
import type { IAuthor } from "../../types/author";
import { Button } from "../../components/ui/button";
import { useConfirmationModalStore } from "../../stores/useConfirmationModalStore";
import { useModalStore } from "../../stores/useModalStore";
import { useNavigate } from "react-router-dom";
import routes from "../../routes/routes";
import type { IBlog } from "../../types/blog";
import PreviewBlog from "./PreviewBlog";
import { calculateAverageReadTime } from "../../utils/average-read-time";
import useDeleteBlog from "../../api/blogs/useDeleteBlog";
import type { ICategory } from "../../types/category";
import toast from "react-hot-toast";
import LoadingOverlay from "../../components/LoadingOverlay";

const BlogCard = ({ blogData }: { blogData: IBlog }) => {
  const deleteMutation = useDeleteBlog();

  const { open, close } = useConfirmationModalStore();

  const { open: openModal } = useModalStore();
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteMutation.mutate(blogData.id, {
      onSuccess: () => {
        toast.success("Blog Deleted Successfully");
        close();
      },
      onError: () => {
        toast.error("Error deleting blog");
        close();
      },
    });
  };
  const authorData: IAuthor = JSON.parse(blogData.author);
  const tags: string[] = JSON.parse(blogData.tags);
  const categoryData: ICategory = JSON.parse(blogData.category);

  return (
    <Card className={cn("w-[350px]")}>
      <LoadingOverlay isVisible={deleteMutation.isPending} />
      <CardHeader>
        <CardTitle>{blogData.title}</CardTitle>
        <div className="flex justify-between items-center gap-2 mt-1">
          <div>{calculateAverageReadTime(blogData.content ?? "")} min read</div>
          <div className="flex justify-end gap-2 items-end">
            <img
              className="w-8 aspect-square rounded-full"
              src={authorData.avatar}
              alt={authorData.name}
            />
            <p>{authorData?.name}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="h-[200px]">
        <CardDescription>
          <div className="h-40 w-full overflow-hidden flex items-center justify-center rounded-md">
            <img
              alt={blogData.title}
              className="h-full object-contain"
              src={blogData?.cover_image}
            />
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {(() => {
              const trimmedTags = tags.map((tag) =>
                tag.length > 15 ? tag.slice(0, 15) + ".." : tag
              );

              const visibleTags = trimmedTags.slice(0, 4);
              const remainingCount = trimmedTags.length - 4;

              return (
                <div className="flex flex-wrap gap-2">
                  {visibleTags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-xs px-2 py-0.5 dark:bg-gray-800 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                  {remainingCount > 0 && (
                    <span className="text-sm text-gray-500">
                      +{remainingCount} more
                    </span>
                  )}
                </div>
              );
            })()}
          </div>
          <p className="mt-2">Category: {categoryData.name}</p>
        </CardDescription>
      </CardContent>
      <CardFooter>
        <div className="flex w-full justify-end gap-4">
          <Button
            variant="ghost"
            onClick={() =>
              openModal({
                title: blogData.title,
                view: <PreviewBlog blogData={blogData} />,
              })
            }
          >
            <Eye />
          </Button>
          <Button
            variant="ghost"
            onClick={() => navigate(routes?.blogs.edit(blogData.id))}
          >
            <SquarePen />
          </Button>
          <Button
            variant="destructive"
            onClick={() => open(handleDelete, "delete")}
          >
            <Trash2 />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
export default BlogCard;
