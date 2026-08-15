import type { Metadata } from "next";
import { Suspense } from "react";
import VerifyEmail from "@/components/Auth/VerifyEmail";
import { Spinner } from "@/components/atoms/ui/spinner";

export const metadata: Metadata = {
  title: "Verify email | Admin Operations Platform",
  description: "Verify your email address to access the Admin Operations Platform.",
};

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-background px-4 py-8 text-foreground">
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
    </div>
  );
}
