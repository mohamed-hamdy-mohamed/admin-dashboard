"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LayoutDashboard } from "lucide-react";
import FieldError from "@/components/Auth/FieldError";
import PasswordInput from "@/components/Auth/PasswordInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { registerUser } from "@/lib/authApi";
import { getApiErrorMessage } from "@/lib/apiError";
import { registerSchema, type RegisterFormValues } from "@/lib/schemas/auth";

const RegisterForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async ({
    firstName,
    lastName,
    email,
    password,
  }: RegisterFormValues) => {
    try {
      await registerUser({ firstName, lastName, email, password });
      router.replace(`/verify-email?email=${encodeURIComponent(email.trim())}`);
    } catch (error) {
      setError("root", { message: getApiErrorMessage(error) });
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
            Create your account
          </h1>
        </div>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-1.5">
            <Label htmlFor="register-first-name">First Name</Label>
            <Input
              id="register-first-name"
              type="text"
              autoComplete="given-name"
              placeholder="Mohamed"
              className="h-10 rounded-xl"
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.firstName)}
              {...register("firstName")}
            />
            <FieldError message={errors.firstName?.message} />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="register-last-name">Last Name</Label>
            <Input
              id="register-last-name"
              type="text"
              autoComplete="family-name"
              placeholder="Hamdy"
              className="h-10 rounded-xl"
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.lastName)}
              {...register("lastName")}
            />
            <FieldError message={errors.lastName?.message} />
          </div>
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="register-email">Email</Label>
          <Input
            id="register-email"
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
          <Label htmlFor="register-password">Password</Label>
          <PasswordInput
            id="register-password"
            autoComplete="new-password"
            placeholder="Create a password"
            className="h-10 rounded-xl"
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.password)}
            {...register("password")}
          />
          <FieldError message={errors.password?.message} />
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="register-confirm-password">Confirm password</Label>
          <PasswordInput
            id="register-confirm-password"
            autoComplete="new-password"
            placeholder="Confirm your password"
            className="h-10 rounded-xl"
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.confirmPassword)}
            {...register("confirmPassword")}
          />
          <FieldError message={errors.confirmPassword?.message} />
        </div>

        <FieldError message={errors.root?.message} />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 h-10 w-full gap-2 rounded-xl"
        >
          {isSubmitting ? <Spinner /> : null}
          {isSubmitting ? "Registering..." : "Register"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-foreground underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
