import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosInstance } from "axios";
import useCreateApi from "../useCreateApi";

const deleteBlog = async (id: string, api: AxiosInstance) => {
  const route = `/blogs/${id}`;

  const result = await api.delete(route);
  return result.data;
};

const useDeleteBlog = () => {
  const api = useCreateApi({ mockUrl: "first" });
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteBlog(id, api),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
  return mutation;
};

export default useDeleteBlog;
