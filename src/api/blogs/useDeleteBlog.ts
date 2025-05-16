import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosInstance } from "axios";
import useCreateSecondApi from "../useCreateSecondApi";

const deleteBlog = async (id: string, api: AxiosInstance) => {
  const route = `/blogs/${id}`;

  const result = await api.delete(route);
  return result.data;
};

const useDeleteBlog = () => {
  const api = useCreateSecondApi();
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
