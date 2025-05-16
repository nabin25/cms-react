import { useState } from "react";
import type { IFormItem } from "../types/form";
import useFetchAuthors from "../api/authors/useFetchAuthors";
import useFetchCategories from "../api/categories/useFetchCategories";

const useBlogFormData = () => {
  const [tagOption, setTagOption] = useState<
    { label: string; value: string }[]
  >([]);
  const { data: authorData, isLoading: isAuthorLoading } = useFetchAuthors();
  const { data: categoryData, isLoading: isCategoryLoading } =
    useFetchCategories();
  const fields: IFormItem[] = [
    {
      name: "title",
      label: "Blog Title",
      placeholder: "Enter blog title...",
      type: "text",
      colSize: 12,
    },
    {
      name: "author_id",
      label: "Author",
      placeholder: "Select author ...",
      type: "select",
      options: authorData?.map((singleAuthor) => ({
        label: singleAuthor?.name,
        value: singleAuthor?.id,
      })),
      colSize: 6,
    },
    {
      name: "category_id",
      label: "Category",
      placeholder: "Select category ...",
      type: "select",
      options: categoryData?.map((singleCategory) => ({
        label: singleCategory?.name,
        value: singleCategory?.id,
      })),
      colSize: 6,
    },
    {
      name: "content",
      label: "Blog Content",
      type: "quill",
      colSize: 12,
    },
    {
      name: "tags",
      label: "Blog Tags",
      type: "creatable-select",
      options: tagOption,
      setOptions: setTagOption,
      colSize: 12,
    },
    {
      name: "cover_image",
      label: "Blog Cover Image",
      type: "image",
      colSize: 6,
    },
    {
      name: "status",
      label: "Blog Status",
      type: "select",
      options: [
        { label: "Published", value: "Published" },
        { label: "Drafted", value: "Drafted" },
      ],
      colSize: 6,
    },
  ];

  const isLoading = isAuthorLoading || isCategoryLoading;
  return {
    fields,
    authorData,
    categoryData,
    setTagOption,
    isLoading,
  };
};

export default useBlogFormData;
