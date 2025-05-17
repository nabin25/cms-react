import { useQuery } from "@tanstack/react-query";
import type { AxiosInstance } from "axios";
import type { ICategory } from "../../types/category";
import { useSearchParams } from "react-router-dom";
import useCreateApi from "../useCreateApi";

const getCategories = async ({
  api,
  page,
  limit,
}: {
  api: AxiosInstance;
  page: string;
  limit: string;
}): Promise<ICategory[]> => {
  const route = `/categories?page=${page}&limit=${limit}`;

  const result = await api.get(route);
  return result.data;
};

const useFetchPaginatedCategories = () => {
  const api = useCreateApi({ mockUrl: "second" });

  const [params] = useSearchParams();

  const page = params.get("page") ?? "1";
  const limit = params.get("limit") ?? "10";

  const result = useQuery({
    queryKey: ["categories", page, limit],
    queryFn: () => getCategories({ api, page, limit }),
  });
  return result;
};

export default useFetchPaginatedCategories;
