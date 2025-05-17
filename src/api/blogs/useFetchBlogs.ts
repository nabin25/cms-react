import { useQuery } from "@tanstack/react-query";
import type { AxiosInstance } from "axios";
import { useSearchParams } from "react-router-dom";
import type { IBlog } from "../../types/blog";
import useCreateFirstApi from "../useCreateFirstApi";
import useDebounce from "../../hooks/useDebounce";

const getBlogs = async ({
  api,
  page,
  limit,
  author,
  category,
  tag,
  title,
  status,
}: {
  api: AxiosInstance;
  page: string;
  limit: string;
  author: string;
  category: string;
  tag: string;
  title: string;
  status: string;
}): Promise<IBlog[]> => {
  const route = `/blogs?page=${page}&limit=${limit}&author_id=${author}&category_id=${category}&tags=${tag}&title=${title}&status=${status}`;

  const result = await api.get(route);
  return result.data;
};

const useFetchBlogs = () => {
  const api = useCreateFirstApi();
  const [params] = useSearchParams();

  const page = params.get("page") ?? "1";
  const limit = params.get("limit") ?? "10";
  const author = params.get("author_id") ?? "";
  const category = params.get("category_id") ?? "";
  const status = params.get("status") ?? "";

  const tag = useDebounce(params.get("tag") ?? "", 600);
  const title = useDebounce(params.get("title") ?? "", 600);

  const result = useQuery({
    queryKey: ["blogs", page, limit, title, tag, category, author, status],
    queryFn: () =>
      getBlogs({ api, page, limit, author, tag, title, category, status }),
  });
  return result;
};

export default useFetchBlogs;
