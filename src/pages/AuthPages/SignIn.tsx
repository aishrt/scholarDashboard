import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="Sign In"
        description="Sign in to your Trux360 account to access fleet management and logistics tools"
        ogTitle="Sign In to Trux360 - Fleet Management Platform"
        ogDescription="Access your fleet management dashboard and logistics tools"
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
