import type { Metadata } from "next";
import { Suspense } from "react";
import AuthSplitLayout from "@/components/Auth/AuthSplitLayout";
import VerifyEmail from "@/components/Auth/VerifyEmail";
import { Spinner } from "@/components/ui/spinner";

export const metadata: Metadata = {
  title: "Verify email | Admin Dashboard",
  description: "Verify your email address to access the admin dashboard.",
};

export default function VerifyEmailPage() {
  return (
    <AuthSplitLayout>
      <Suspense
        fallback={
          <div className="flex w-full max-w-[24rem] items-center gap-3 text-sm text-muted-foreground">
            <Spinner />
            Loading...
          </div>
        }
      >
        <VerifyEmail />
      </Suspense>
    </AuthSplitLayout>
  );
}
