import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { generateRandomToken } from "../../utils/generate-mock-token";

const signUpUser = async ({
  email,
  password,
  full_name,
}: {
  email: string;
  password: string;
  full_name: string;
}) => {
  const result = await axios.post(
    `${import.meta.env.VITE_FIRST_MOCK_ENDPOINT}/api/users`,
    { email, password, full_name, token: generateRandomToken() }
  );

  return result?.data;
};

const useCreateAccount = () => {
  return useMutation({
    mutationFn: signUpUser,
  });
};

export default useCreateAccount;
