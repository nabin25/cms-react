import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { AxiosInstance } from "axios";
import type { ICategory } from "../../types/category";
import useCreateApi from "../useCreateApi";

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
  const api = useCreateApi({ mockUrl: "second" });

  const result = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories({ api }),
    placeholderData: keepPreviousData,
  });
  return result;
};

export default useFetchCategories;
