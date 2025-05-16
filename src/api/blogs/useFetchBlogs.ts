import { useQuery } from "@tanstack/react-query";
import type { AxiosInstance } from "axios";
import { useSearchParams } from "react-router-dom";
import type { IBlog } from "../../types/blog";
import useCreateFirstApi from "../useCreateFirstApi";

const getBlogs = async ({
  api,
  page,
  limit,
}: {
  api: AxiosInstance;
  page: string;
  limit: string;
}): Promise<IBlog[]> => {
  const route = `/blogs?page=${page}&limit=${limit}`;

  const result = await api.get(route);
  return result.data;
};

const useFetchBlogs = () => {
  const api = useCreateFirstApi();
  const [params] = useSearchParams();

  const page = params.get("page") ?? "1";
  const limit = params.get("limit") ?? "10";

  const result = useQuery({
    queryKey: ["blogs", page, limit],
    queryFn: () => getBlogs({ api, page, limit }),
  });
  return result;
};

export default useFetchBlogs;
