import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosInstance } from "axios";
import useCreateSecondApi from "../useCreateSecondApi";
import type { AuthorType } from "../../schemas/author.schema";

const editAuthor = async (data: AuthorType, id: string, api: AxiosInstance) => {
  const route = `/authors/` + id;
  const result = await api.put(route, data);
  return result.data;
};

const useEditAuthor = () => {
  const api = useCreateSecondApi();
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: { formData: AuthorType; id: string }) =>
      editAuthor(data.formData, data.id, api),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["authors"] });
    },
  });
  return mutation;
};

export default useEditAuthor;
