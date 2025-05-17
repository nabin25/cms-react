import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosInstance } from "axios";
import type { BlogData } from "../../schemas/blog.schema";
import useBlogFormData from "../../hooks/useBlogFormData";
import type { ICategory } from "../../types/category";
import type { IAuthor } from "../../types/author";
import useCreateApi from "../useCreateApi";

const editBlog = async (
  data: { formData: BlogData; id: string },
  categoryData: ICategory[] | undefined,
  authorData: IAuthor[] | undefined,
  api: AxiosInstance
) => {
  const route = `/blogs/` + data.id;
  const result = await api.put(route, {
    ...data,
    tags: JSON.stringify(data.formData.tags?.map((tag) => tag.label)),
    category: JSON.stringify(
      categoryData?.find(
        (category) => category?.id === data.formData?.category_id
      )
    ),
    author: JSON.stringify(
      authorData?.find((author) => author?.id === data.formData?.author_id)
    ),
  });
  return result.data;
};

const useEditBlog = () => {
  const api = useCreateApi({ mockUrl: "first" });
  const client = useQueryClient();
  const { categoryData, authorData } = useBlogFormData();

  const mutation = useMutation({
    mutationFn: (data: { formData: BlogData; id: string }) =>
      editBlog(data, categoryData, authorData, api),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
  return mutation;
};

export default useEditBlog;
