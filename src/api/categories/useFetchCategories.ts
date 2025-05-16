import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { AxiosInstance } from "axios";
import useCreateSecondApi from "../useCreateSecondApi";
import type { ICategory } from "../../types/category";

const getCategories = async ({
  api,
}: {
  api: AxiosInstance;
}): Promise<ICategory[]> => {
  const route = "/categories";

  const result = await api.get(route);
  return result.data;
};

const useFetchCategories = () => {
  const api = useCreateSecondApi();

  const result = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories({ api }),
    placeholderData: keepPreviousData,
  });
  return result;
};

export default useFetchCategories;
