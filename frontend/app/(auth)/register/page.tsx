import type { Metadata } from "next";
import AuthSplitLayout from "@/components/Auth/AuthSplitLayout";
import RegisterForm from "@/components/Auth/RegisterForm";

export const metadata: Metadata = {
  title: "Register | Admin Dashboard",
  description: "Create an account to access the admin dashboard.",
};

export default function RegisterPage() {
  return (
    <AuthSplitLayout>
      <RegisterForm />
    </AuthSplitLayout>
  );
}
