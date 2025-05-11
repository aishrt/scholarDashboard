import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignUpForm from "../../components/auth/SignUpForm";

export default function SignUp() {
  return (
    <>
      <PageMeta
        title="Sign Up"
        description="Create your Trux360 account to start managing your fleet and logistics operations"
        ogTitle="Sign Up for Trux360 - Fleet Management Platform"
        ogDescription="Join Trux360 to streamline your fleet management and logistics operations"
      />
      <AuthLayout>
        <SignUpForm />
      </AuthLayout>
    </>
  );
}
