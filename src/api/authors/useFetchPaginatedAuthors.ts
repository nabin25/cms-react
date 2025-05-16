import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { AxiosInstance } from "axios";
import useCreateSecondApi from "../useCreateSecondApi";
import type { IAuthor } from "../../types/author";
import { useSearchParams } from "react-router-dom";

const getAuthors = async ({
  api,
  page,
  limit,
}: {
  api: AxiosInstance;
  page: string;
  limit: string;
}): Promise<IAuthor[]> => {
  const route = `/authors?page=${page}&limit=${limit}`;

  const result = await api.get(route);
  return result.data;
};

const useFetchPaginatedAuthors = () => {
  const api = useCreateSecondApi();
  const [params] = useSearchParams();

  const page = params.get("page") ?? "1";
  const limit = params.get("limit") ?? "10";

  const result = useQuery({
    queryKey: ["authors", page, limit],
    queryFn: () => getAuthors({ api, page, limit }),
    placeholderData: keepPreviousData,
  });
  return result;
};

export default useFetchPaginatedAuthors;
