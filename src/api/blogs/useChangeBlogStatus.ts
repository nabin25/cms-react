import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosInstance } from "axios";
import useCreateFirstApi from "../useCreateFirstApi";

type FormData = {
  status: "Published" | "Drafted";
};

const changeStatus = async (
  data: { formData: FormData; id: string },
  api: AxiosInstance
) => {
  const route = `/blogs/` + data.id;
  const result = await api.put(route, data.formData);
  return result.data;
};

const useChangeBlogStatus = () => {
  const api = useCreateFirstApi();
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: { formData: FormData; id: string }) =>
      changeStatus(data, api),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
  return mutation;
};

export default useChangeBlogStatus;
