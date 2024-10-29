import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LoginForm, loginFormSchema } from "@/modules/auth/data/schema";
import { useAuth } from "@/modules/auth/hooks/use-auth";

export function LoginAuthForm() {
  const { loginMutation } = useAuth();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      contrasena: "",
      correo: "",
    },
  });

  const onSubmit = async (values: LoginForm) => {
    const response = await loginMutation.mutateAsync(values);
    console.log("🚀 ~ onSubmit ~ response:", response);
    switch (response.usuario.idRol) {
      case 1:
        window.location.href = "/admin";
        break;
      case 2:
        window.location.href = "/asociado";
        break;
      default:
        window.location.href = "/empresa";
    }
  };

  const isLoading = loginMutation.isPending;

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <FormField
          control={form.control}
          name="correo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="Email"
                  autoComplete="username"
                  disabled={isLoading}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contrasena"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="********"
                  autoComplete="current-password"
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          Ingresar
        </Button>
      </form>
    </Form>
  );
}
