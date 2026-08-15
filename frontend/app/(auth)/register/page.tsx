import type { Metadata } from "next";
import AuthSplitLayout from "@/components/Auth/AuthSplitLayout";
import RegisterForm from "@/components/Auth/RegisterForm";

export const metadata: Metadata = {
  title: "Register | Admin Operations Platform",
  description: "Create an account to access the Admin Operations Platform.",
};

export default function RegisterPage() {
  return (
    <AuthSplitLayout>
      <RegisterForm />
    </AuthSplitLayout>
  );
}
