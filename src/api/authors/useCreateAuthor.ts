import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosInstance } from "axios";
import type { AuthorType } from "../../schemas/author.schema";
import useCreateApi from "../useCreateApi";

const createAuthor = async (data: AuthorType, api: AxiosInstance) => {
  const route = `/authors`;
  const result = await api.post(route, { ...data, created_at: new Date() });
  return result.data;
};

const useCreateAuthor = () => {
  const api = useCreateApi({ mockUrl: "second" });
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: AuthorType) => createAuthor(data, api),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["authors"] });
    },
  });
  return mutation;
};

export default useCreateAuthor;
