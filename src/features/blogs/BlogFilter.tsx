import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";
import { Input } from "../../components/ui/input";
import useFetchAuthors from "../../api/authors/useFetchAuthors";
import useFetchCategories from "../../api/categories/useFetchCategories";
import { Label } from "../../components/ui/label";
import { useSearchParams } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { FunnelPlus } from "lucide-react";

const BlogFilter = () => {
  const { data: authorData } = useFetchAuthors();
  const { data: categoryData } = useFetchCategories();

  const authorOptions = authorData?.map((author) => ({
    label: author.name,
    value: author.id,
  }));

  const categoryOptions = categoryData?.map((category) => ({
    label: category.name,
    value: category.id,
  }));

  const [params, setParams] = useSearchParams();

  const author = params.get("author_id") ?? "";
  const category = params.get("category_id") ?? "";

  const tag = params.get("tag") ?? "";
  const title = params.get("title") ?? "";

  const handleSetParams = ({
    fieldName,
    changedValue,
  }: {
    fieldName: string;
    changedValue: string;
  }) => {
    const newParams = new URLSearchParams(params);
    newParams.set(fieldName, changedValue);
    setParams(newParams, { replace: true });
  };

  const handleClearFilter = () => {
    setParams({});
  };

  return (
    <>
      <Sheet>
        <SheetTrigger>
          <Button variant="outline">
            <FunnelPlus />
          </Button>
        </SheetTrigger>
        <SheetContent className="p-3">
          <SheetTitle>Filter Blogs</SheetTitle>
          <SheetDescription>
            <Label className="mt-2">Search By Tag</Label>
            <Input
              className="mt-2"
              value={tag}
              onChange={(e) =>
                handleSetParams({
                  fieldName: "tag",
                  changedValue: e.target.value,
                })
              }
            />

            <Label className="mt-4">Search By Title</Label>
            <Input
              className="mt-2"
              value={title}
              onChange={(e) =>
                handleSetParams({
                  fieldName: "title",
                  changedValue: e.target.value,
                })
              }
            />

            <Label className="mt-4">Search By Author</Label>
            <select
              value={author}
              onChange={(e) =>
                handleSetParams({
                  fieldName: "author_id",
                  changedValue: e.target.value,
                })
              }
              className="w-full mt-2 border p-2 rounded-md"
            >
              {authorOptions?.map((author) => (
                <option key={author.value} value={author.value}>
                  {author.label}
                </option>
              ))}
            </select>

            <Label className="mt-4">Search By Category</Label>
            <select
              value={category}
              onChange={(e) =>
                handleSetParams({
                  fieldName: "category_id",
                  changedValue: e.target.value,
                })
              }
              className="w-full mt-2 border p-2 rounded-md"
            >
              {categoryOptions?.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </SheetDescription>
          <SheetFooter>
            <Button onClick={handleClearFilter} variant="destructive">
              Clear filter
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default BlogFilter;
