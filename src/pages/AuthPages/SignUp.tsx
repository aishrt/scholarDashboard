import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignUpForm from "../../components/auth/SignUpForm";

export default function SignUp() {
  return (
    <>
      <PageMeta
        title="Sign Up"
        description="Create your Scholarship Portal account to start managing your scholarship and logistics operations"
        ogTitle="Sign Up for Scholarship Portal - Scholarship Management Platform"
        ogDescription="Join Scholarship Portal to streamline your scholarship management and logistics operations"
      />
      <AuthLayout>
        <SignUpForm />
      </AuthLayout>
    </>
  );
}
