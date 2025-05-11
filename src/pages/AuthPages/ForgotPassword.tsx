import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import ForgotPasswordForm from "../../components/auth/ForgotPasswordForm";

export default function ForgotPassword() {
  return (
    <>
      <PageMeta
        title="Forgot Password"
        description="Reset your Trux360 account password to regain access to your fleet management platform"
        ogTitle="Reset Password - Trux360"
        ogDescription="Reset your Trux360 account password to regain access to your fleet management platform"
      />
      <AuthLayout>
        <ForgotPasswordForm />
      </AuthLayout>
    </>
  );
}
