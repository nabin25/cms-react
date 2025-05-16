import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosInstance } from "axios";
import useCreateSecondApi from "../useCreateSecondApi";
import type { CategoryType } from "../../schemas/category.schema";

const editCategory = async (
  data: CategoryType,
  id: string,
  api: AxiosInstance
) => {
  const route = `/categories/` + id;
  const result = await api.put(route, data);
  return result.data;
};

const useEditCategory = () => {
  const api = useCreateSecondApi();
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: { formData: CategoryType; id: string }) =>
      editCategory(data.formData, data.id, api),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["categories"] });
    },
  });
  return mutation;
};

export default useEditCategory;
