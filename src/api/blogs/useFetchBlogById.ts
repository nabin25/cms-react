import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { AxiosInstance } from "axios";
import type { IBlog } from "../../types/blog";
import useCreateApi from "../useCreateApi";

const getAuthors = async ({
  api,
  id,
}: {
  api: AxiosInstance;
  id?: string;
}): Promise<IBlog | null> => {
  if (!id) {
    return null;
  }

  const route = "/blogs/" + id;

  const result = await api.get(route);
  return result.data;
};

const useFetchBlogById = ({ id }: { id?: string }) => {
  const api = useCreateApi({ mockUrl: "first" });

  const result = useQuery({
    queryKey: ["blogs", id],
    queryFn: () => getAuthors({ api, id }),
    placeholderData: keepPreviousData,
  });
  return result;
};

export default useFetchBlogById;
