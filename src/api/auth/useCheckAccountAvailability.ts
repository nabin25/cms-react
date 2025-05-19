import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const checkEmail = async ({ email }: { email: string }) => {
  const result = await axios.get(
    `${import.meta.env.VITE_FIRST_MOCK_ENDPOINT}/api/users?email=${email}`
  );

  return result?.data;
};

const useCheckAccountAvailability = () => {
  return useMutation({
    mutationFn: checkEmail,
  });
};

export default useCheckAccountAvailability;
