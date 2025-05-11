import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="Sign In"
        description="Sign in to your Scholarship Portal account to access scholarship management and application tools"
        ogTitle="Sign In to Scholarship Portal - Scholarship Management Platform"
        ogDescription="Access your scholarship management dashboard and application tools"
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
