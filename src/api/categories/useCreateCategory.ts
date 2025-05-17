import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosInstance } from "axios";
import type { CategoryType } from "../../schemas/category.schema";
import useCreateApi from "../useCreateApi";

const createCategory = async (data: CategoryType, api: AxiosInstance) => {
  const route = `/categories`;
  const result = await api.post(route, data);
  return result.data;
};

const useCreateCategory = () => {
  const api = useCreateApi({ mockUrl: "second" });
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: CategoryType) => createCategory(data, api),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["categories"] });
    },
  });
  return mutation;
};

export default useCreateCategory;
