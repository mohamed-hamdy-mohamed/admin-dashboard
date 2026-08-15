import type { Metadata } from "next";
import AuthSplitLayout from "@/components/Auth/AuthSplitLayout";
import LoginForm from "@/components/Auth/LoginForm";

export const metadata: Metadata = {
  title: "Sign in | Admin Operations Platform",
  description: "Sign in to access the Admin Operations Platform.",
};

export default function LoginPage() {
  return (
    <AuthSplitLayout>
      <LoginForm />
    </AuthSplitLayout>
  );
}
