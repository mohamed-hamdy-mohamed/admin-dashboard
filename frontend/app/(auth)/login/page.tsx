import type { Metadata } from "next";
import AuthSplitLayout from "@/components/Auth/AuthSplitLayout";
import LoginForm from "@/components/Auth/LoginForm";

export const metadata: Metadata = {
  title: "Sign in | Admin Dashboard",
  description: "Sign in to access the admin dashboard.",
};

export default function LoginPage() {
  return (
    <AuthSplitLayout>
      <LoginForm />
    </AuthSplitLayout>
  );
}
