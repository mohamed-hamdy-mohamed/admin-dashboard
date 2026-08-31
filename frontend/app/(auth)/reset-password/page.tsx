import type { Metadata } from "next";
import { Suspense } from "react";
import AuthSplitLayout from "@/components/Auth/AuthSplitLayout";
import ResetPasswordForm from "@/components/Auth/ResetPasswordForm";
import { Spinner } from "@/shared/atoms/spinner";

export const metadata: Metadata = {
  title: "Reset password | Admin Operations Platform",
  description: "Choose a new password for your Admin Operations Platform account.",
};

export default function ResetPasswordPage() {
  return (
    <AuthSplitLayout>
      <Suspense
        fallback={
          <div className="flex w-full max-w-[26.5rem] items-center gap-3 text-sm text-muted-foreground">
            <Spinner />
            Loading...
          </div>
        }
      >
        <ResetPasswordForm />
      </Suspense>
    </AuthSplitLayout>
  );
}
