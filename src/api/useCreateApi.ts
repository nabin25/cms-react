import axios from "axios";
import { useAuth } from "../providers/AuthProvider";

const useCreateApi = ({ mockUrl }: { mockUrl: "first" | "second" }) => {
  const token = localStorage.getItem("token");
  const { logout } = useAuth();

  const api = axios.create({
    baseURL:
      mockUrl === "first"
        ? import.meta.env.VITE_FIRST_MOCK_ENDPOINT
        : import.meta.env.VITE_SECOND_MOCK_ENDPOINT + "/api",
  });

  api.interceptors.request.use(function (config) {
    if (config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
      config.headers["Origin"] = window.location.href;

      return config;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if ([401, 403].includes(parseInt(error?.response?.status))) {
        logout();
      }
      return Promise.reject(error);
    }
  );

  return api;
};

export default useCreateApi;
