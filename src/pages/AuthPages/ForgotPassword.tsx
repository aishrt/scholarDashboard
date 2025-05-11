import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import ForgotPasswordForm from "../../components/auth/ForgotPasswordForm";

export default function ForgotPassword() {
  return (
    <>
      <PageMeta
        title="Forgot Password"
        description="Reset your Scholarship Portal account password to regain access to your scholarship management platform"
        ogTitle="Reset Password - Scholarship Portal"
        ogDescription="Reset your Scholarship Portal account password to regain access to your scholarship management platform"
      />
      <AuthLayout>
        <ForgotPasswordForm />
      </AuthLayout>
    </>
  );
}
