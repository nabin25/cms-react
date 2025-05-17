import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosInstance } from "axios";
import type { BlogData } from "../../schemas/blog.schema";
import useBlogFormData from "../../hooks/useBlogFormData";
import type { ICategory } from "../../types/category";
import type { IAuthor } from "../../types/author";
import useCreateApi from "../useCreateApi";

const createBlog = async (
  data: BlogData,
  categoryData: ICategory[] | undefined,
  authorData: IAuthor[] | undefined,
  api: AxiosInstance
) => {
  const route = `/blogs`;
  const result = await api.post(route, {
    ...data,
    created_at: new Date(),
    tags: JSON.stringify(data.tags?.map((tag) => tag.label)),
    category: JSON.stringify(
      categoryData?.find((category) => category?.id === data?.category_id)
    ),
    author: JSON.stringify(
      authorData?.find((author) => author?.id === data?.author_id)
    ),
  });
  return result.data;
};

const useCreateBlog = () => {
  const api = useCreateApi({ mockUrl: "first" });
  const client = useQueryClient();
  const { categoryData, authorData } = useBlogFormData();

  const mutation = useMutation({
    mutationFn: (data: BlogData) =>
      createBlog(data, categoryData, authorData, api),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
  return mutation;
};

export default useCreateBlog;
