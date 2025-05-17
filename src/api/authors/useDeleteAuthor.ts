import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosInstance } from "axios";
import useCreateApi from "../useCreateApi";

const deleteAuthor = async (id: string, api: AxiosInstance) => {
  const route = `/authors/${id}`;

  const result = await api.delete(route);
  return result.data;
};

const useDeleteAuthor = () => {
  const api = useCreateApi({ mockUrl: "second" });
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteAuthor(id, api),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["authors"] });
    },
  });
  return mutation;
};

export default useDeleteAuthor;
