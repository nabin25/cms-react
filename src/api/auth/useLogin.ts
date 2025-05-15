import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const result = await axios.get(
    `${import.meta.env.VITE_FIRST_MOCK_ENDPOINT}/api/users?email=${email}&password=${password}`
  );

  return result?.data;
};

const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};

export default useLogin;
