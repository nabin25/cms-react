import { z } from "zod";
import { loginSchema } from "../../schemas/login.schema";
import { useForm } from "react-hook-form";
import useLogin from "../../api/auth/useLogin";
import { useAuth } from "../../providers/AuthProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../../components/ui/form";
import { Navigate } from "react-router-dom";

type ILoginData = z.infer<typeof loginSchema>;

const SignInPage = () => {
  const form = useForm<ILoginData>({ resolver: zodResolver(loginSchema) });

  const loginMutation = useLogin();

  const { login, user, token } = useAuth();

  if (user || token) {
    <Navigate to={"/"} />;
  }

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
      <div className="max-w-[500px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your Email" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your password"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default SignInPage;
