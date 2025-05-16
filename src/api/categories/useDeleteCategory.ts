import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosInstance } from "axios";
import useCreateSecondApi from "../useCreateSecondApi";

const deleteCategory = async (id: string, api: AxiosInstance) => {
  const route = `/categories/${id}`;

  const result = await api.delete(route);
  return result.data;
};

const useDeleteCategory = () => {
  const api = useCreateSecondApi();
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteCategory(id, api),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["categories"] });
    },
  });
  return mutation;
};

export default useDeleteCategory;
