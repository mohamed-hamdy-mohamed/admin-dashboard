"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FieldError from "@/components/Auth/FieldError";
import AuthBrandHeader from "@/shared/molecules/AuthBrandHeader";
import PasswordInput from "@/components/Auth/PasswordInput";
import { Button } from "@/shared/atoms/button";
import { Label } from "@/shared/atoms/label";
import { Spinner } from "@/shared/atoms/spinner";
import { resetPassword } from "@/lib/authApi";
import { getApiErrorMessage } from "@/lib/apiError";
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "@/lib/schemas/auth";
import toast from "react-hot-toast";

const ResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token")?.trim() ?? "";
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async ({ password }: ResetPasswordFormValues) => {
    if (!token) {
      toast.error("Reset link is invalid or has expired.");
      return;
    }

    try {
      const response = await resetPassword({ token, password });
      toast.success(response.message);
      router.replace("/login");
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  };

  return (
    <div className="w-full max-w-[26.5rem]">
      <AuthBrandHeader title="Reset password" />

      {token ? (
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <Label htmlFor="reset-password">New password</Label>
            <PasswordInput
              id="reset-password"
              autoComplete="new-password"
              placeholder="Enter a new password"
              className="h-11 rounded-xl"
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.password)}
              {...register("password")}
            />
            <FieldError message={errors.password?.message} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="reset-confirm-password">Confirm password</Label>
            <PasswordInput
              id="reset-confirm-password"
              autoComplete="new-password"
              placeholder="Confirm your new password"
              className="h-11 rounded-xl"
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.confirmPassword)}
              {...register("confirmPassword")}
            />
            <FieldError message={errors.confirmPassword?.message} />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 h-11 w-full gap-2 rounded-xl"
          >
            {isSubmitting ? <Spinner /> : null}
            {isSubmitting ? "Resetting..." : "Reset password"}
          </Button>
        </form>
      ) : (
        <p className="text-sm text-muted-foreground">
          This reset link is invalid or has expired. Request a new one from the
          sign-in page.
        </p>
      )}

      <p className="mt-6 text-center text-sm text-muted-foreground">
        <Link
          href="/login"
          className="font-semibold text-foreground underline-offset-4 hover:underline"
        >
          Back to sign in
        </Link>
      </p>
    </div>
  );
};

export default ResetPasswordForm;
