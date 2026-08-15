"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FieldError from "@/components/Auth/FieldError";
import AuthBrandHeader from "@/components/molecules/AuthBrandHeader";
import { Button } from "@/components/atoms/ui/button";
import { Input } from "@/components/atoms/ui/input";
import { Label } from "@/components/atoms/ui/label";
import { Spinner } from "@/components/atoms/ui/spinner";
import { getVerificationStatus, resendVerification, verifyEmail } from "@/lib/authApi";
import { getApiErrorMessage } from "@/lib/apiError";
import {
  resendVerificationSchema,
  type ResendVerificationFormValues,
} from "@/lib/schemas/auth";
import toast from "react-hot-toast";

const GMAIL_INBOX_URL = "https://mail.google.com/";

const VerifyEmail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token")?.trim() ?? "";
  const emailFromQuery = searchParams.get("email")?.trim() ?? "";
  const [isChecking, setIsChecking] = useState(Boolean(token || emailFromQuery));
  const [isVerifying, setIsVerifying] = useState(Boolean(token));
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ResendVerificationFormValues>({
    resolver: zodResolver(resendVerificationSchema),
    defaultValues: {
      email: emailFromQuery,
    },
  });

  useEffect(() => {
    reset({ email: emailFromQuery });
  }, [emailFromQuery, reset]);

  useEffect(() => {
    if (token || !emailFromQuery) {
      return;
    }

    let cancelled = false;

    const checkStatus = async () => {
      try {
        const response = await getVerificationStatus({ email: emailFromQuery });
        if (cancelled) {
          return;
        }

        if (response.data.emailVerified) {
          router.replace("/login");
          return;
        }
      } catch {
        // Keep the existing unverified page if status cannot be determined.
      }

      if (!cancelled) {
        setIsChecking(false);
      }
    };

    void checkStatus();

    return () => {
      cancelled = true;
    };
  }, [emailFromQuery, router, token]);

  useEffect(() => {
    if (!token) {
      return;
    }

    let cancelled = false;

    const verify = async () => {
      try {
        const response = await verifyEmail({ token });
        if (cancelled) {
          return;
        }

        if (!response.data?.alreadyVerified) {
          toast.success(response.message);
        }
        router.replace("/login");
      } catch (error) {
        if (!cancelled) {
          setErrorMessage(getApiErrorMessage(error));
          setIsVerifying(false);
          setIsChecking(false);
        }
      }
    };

    void verify();

    return () => {
      cancelled = true;
    };
  }, [router, token]);

  const onResend = async ({ email }: ResendVerificationFormValues) => {
    try {
      const response = await resendVerification({ email });
      toast.success(response.message);
      setErrorMessage("");
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  };

  const openGmail = () => {
    window.open(GMAIL_INBOX_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="w-full max-w-[24rem]">
      <AuthBrandHeader title="Verify your email" className="mb-8" />

      {isChecking || isVerifying ? (
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Spinner />
          {isVerifying ? "Verifying your email..." : "Loading..."}
        </div>
      ) : (
        <>
          {errorMessage ? (
            <p className="mb-4 text-sm text-destructive">{errorMessage}</p>
          ) : (
            <div className="mb-6 space-y-2 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Check your email</p>
              <p>
                {emailFromQuery
                  ? `We sent a verification link to ${emailFromQuery}. Open that email and click the link to activate your account.`
                  : "We sent a verification link to your email. Open that email and click the link to activate your account."}
              </p>
              <p>The link expires in 15 minutes and can be used only once.</p>
            </div>
          )}

          <Button
            type="button"
            variant="outline"
            className="mb-4 h-10 w-full rounded-xl"
            onClick={openGmail}
          >
            Open Gmail
          </Button>

          <form className="space-y-4" onSubmit={handleSubmit(onResend)}>
            <div className="grid gap-1.5">
              <Label htmlFor="verify-email">Email</Label>
              <Input
                id="verify-email"
                type="email"
                autoComplete="email"
                placeholder="admin@company.com"
                readOnly
                className="h-10 rounded-xl bg-muted"
                aria-invalid={Boolean(errors.email)}
                {...register("email")}
              />
              <FieldError message={errors.email?.message} />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-10 w-full gap-2 rounded-xl"
            >
              {isSubmitting ? <Spinner /> : null}
              {isSubmitting ? "Sending..." : "Resend verification email"}
            </Button>
          </form>
        </>
      )}

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already verified?{" "}
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

export default VerifyEmail;
