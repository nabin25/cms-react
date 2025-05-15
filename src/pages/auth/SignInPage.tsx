import { z } from "zod";
import { loginSchema } from "../../schemas/login.schema";
import { useForm } from "react-hook-form";
import useLogin from "../../api/auth/useLogin";
import { useAuth } from "../../providers/AuthProvider";
import { zodResolver } from "@hookform/resolvers/zod";

type ILoginData = z.infer<typeof loginSchema>;

const SignInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginData>({ resolver: zodResolver(loginSchema) });

  const loginMutation = useLogin();

  const { login } = useAuth();

  const onSubmit = (data: ILoginData) => {
    loginMutation?.mutate(data, {
      onSuccess: (data) => {
        if (data && data.length > 0) {
          login(
            {
              full_name: data[0]?.full_name,
              email: data[0]?.email,
              avatar: data[0]?.avatar,
            },
            data[0]?.token
          );
        } else {
        }
      },
      onError: () => {},
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register("email")}
          className="block border-black dark:border-white"
        />
        {errors?.email?.message && (
          <p className="block">{errors?.email?.message}</p>
        )}
        <input
          type="password"
          {...register("password")}
          className="block border-black dark:border-white"
        />
        {errors?.password?.message && (
          <p className="block">{errors?.password?.message}</p>
        )}
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default SignInPage;
