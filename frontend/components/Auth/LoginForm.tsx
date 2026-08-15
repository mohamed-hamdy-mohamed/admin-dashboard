"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LayoutDashboard } from "lucide-react";
import FieldError from "@/components/Auth/FieldError";
import ForgotPasswordDialog from "@/components/Auth/ForgotPasswordDialog";
import PasswordInput from "@/components/Auth/PasswordInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { loginUser } from "@/lib/authApi";
import { getApiErrorMessage } from "@/lib/apiError";
import { loginSchema, type LoginFormValues } from "@/lib/schemas/auth";
import { useAuth } from "@/providers/AuthProvider";
import toast from "react-hot-toast";

const LoginForm = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async ({ email, password }: LoginFormValues) => {
    try {
      const response = await loginUser({ email, password });
      login(response.data.token, response.data.user);
      toast.success("Welcome back");
      router.replace("/");
    } catch (error) {
      const message = getApiErrorMessage(error);
      toast.error(message);

      if (message === "Please verify your email before signing in.") {
        router.replace(`/verify-email?email=${encodeURIComponent(email.trim())}`);
      }
    }
  };

  return (
    <div className="w-full max-w-[24rem]">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <LayoutDashboard className="size-4" />
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Admin Dashboard
          </p>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            Welcome back
          </h1>
        </div>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-1.5">
          <Label htmlFor="login-email">Email</Label>
          <Input
            id="login-email"
            type="email"
            autoComplete="email"
            placeholder="admin@company.com"
            className="h-10 rounded-xl"
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.email)}
            {...register("email")}
          />
          <FieldError message={errors.email?.message} />
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="login-password">Password</Label>
          <PasswordInput
            id="login-password"
            autoComplete="current-password"
            placeholder="Enter your password"
            className="h-10 rounded-xl"
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.password)}
            {...register("password")}
          />
          <FieldError message={errors.password?.message} />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
            <input
              type="checkbox"
              disabled={isSubmitting}
              className="size-4 rounded border border-input accent-primary"
              {...register("rememberMe")}
            />
            Remember me
          </label>

          <button
            type="button"
            className="text-sm font-medium text-foreground underline-offset-4 hover:underline"
            onClick={() => setForgotPasswordOpen(true)}
          >
            Forgot password?
          </button>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 h-10 w-full gap-2 rounded-xl"
        >
          {isSubmitting ? <Spinner /> : null}
          {isSubmitting ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-foreground underline-offset-4 hover:underline"
        >
          Register
        </Link>
      </p>

      <ForgotPasswordDialog
        open={forgotPasswordOpen}
        defaultEmail={getValues("email")}
        onOpenChange={setForgotPasswordOpen}
      />
    </div>
  );
};

export default LoginForm;
