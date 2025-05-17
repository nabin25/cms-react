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
  FormMessage,
} from "../../components/ui/form";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";

type ILoginData = z.infer<typeof loginSchema>;

const SignInPage = () => {
  const form = useForm<ILoginData>({ resolver: zodResolver(loginSchema) });

  const loginMutation = useLogin();

  useEffect(() => {
    document.title = "SignIn-SpellCMS";
  }, []);

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
          setTimeout(() => toast.success("Logged In Successfully"), 100);
        } else {
          toast.error("Invalid Login Credentials");
        }
      },
      onError: () => {
        toast.error("Invalid Login Credentials");
      },
    });
  };
  return (
    <>
      <div className="w-full h-[100svh] flex items-center justify-center">
        <div className="max-w-[500px] md:min-w-[500px] sm:w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
            >
              <h3 className="text-xl">
                Sign in to your{" "}
                <strong>
                  {" "}
                  <span className="text-[#94288d]">Spell</span>
                  <span className="text-[#ff4504]">CMS</span>
                </strong>
              </h3>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Email</FormLabel>
                    <FormControl>
                      <Input
                        className="h-12"
                        placeholder="Enter your Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.email?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your password"
                        {...field}
                        className="h-12"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.password?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
