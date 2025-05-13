import PageBreadcrumb from "../components/common/PageBreadCrumb";
import UserMetaCard from "../components/UserProfile/UserMetaCard";
import UserInfoCard from "../components/UserProfile/UserInfoCard";
import UserAddressCard from "../components/UserProfile/UserAddressCard";
import PageMeta from "../components/common/PageMeta";
import { useAuthStore } from "../store/authStore";

export default function UserProfiles() {
  const user = useAuthStore((state) => state.user);
  return (
    <>
      <PageMeta
        title="User Profile"
        description="Manage your Scholarship Portal  user profile, preferences, and account settings"
        ogTitle="User Profile - Scholarship Portal"
        ogDescription="Manage your account settings and preferences on Scholarship Portal"
      />
      <PageBreadcrumb pageTitle="Profile" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="space-y-6">
     
          <UserMetaCard profileData={user} />
          <UserInfoCard profileData={user}/>
          {/* <UserAddressCard profileData={user}/> */}
        </div>
      </div>
    </>
  );
}
