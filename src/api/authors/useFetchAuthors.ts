import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { AxiosInstance } from "axios";
import type { IAuthor } from "../../types/author";
import useCreateApi from "../useCreateApi";

const getAuthors = async ({
  api,
}: {
  api: AxiosInstance;
}): Promise<IAuthor[]> => {
  const route = "/authors";

  const result = await api.get(route);
  return result.data;
};

const useFetchAuthors = () => {
  const api = useCreateApi({ mockUrl: "second" });

  const result = useQuery({
    queryKey: ["authors"],
    queryFn: () => getAuthors({ api }),
    placeholderData: keepPreviousData,
  });
  return result;
};

export default useFetchAuthors;
