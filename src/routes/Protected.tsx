import { Navigate, Outlet } from "react-router-dom";
import { Suspense } from "react";
import NotFound from "../pages/OtherPage/NotFound";
import UserProfiles from "../pages/UserProfiles";
import { ScrollToTop } from "../components/common/ScrollToTop";
import AppLayout from "../layout/AppLayout";
import ErrorPage from "../pages/OtherPage/ErrorPage";
import Home from "../pages/Dashboard/Home";
import Blank from "../pages/Blank";
import Calendar from "../pages/Calendar";
import LineChart from "../pages/Charts/LineChart";
import FormElements from "../pages/Forms/FormElements";
import BarChart from "../pages/Charts/BarChart";
import Videos from "../pages/UiElements/Videos";
import Images from "../pages/UiElements/Images";
import Buttons from "../pages/UiElements/Buttons";
import Badges from "../pages/UiElements/Badges";
import Avatars from "../pages/UiElements/Avatars";
import Alerts from "../pages/UiElements/Alerts";
import BasicTables from "../pages/Tables/BasicTables";
import UserList from "../pages/AdminPages/UserList";
import AddUsers from "../pages/AdminPages/AddCoupons";
import AddCoupons from "../pages/AdminPages/AddCoupons";
import CouponsList from "../pages/AdminPages/CouponsList";
import CategoryList from "../pages/AdminPages/CategoryList";
import AddCategory from "../pages/AdminPages/AddCategory";
import AddVersion from "../pages/AdminPages/AddVersion";
import VersionList from "../pages/AdminPages/VersionList";
import DeviceList from "../pages/AdminPages/DeviceList";
// import { useAuthStore } from "../store/authStore";

const ProtectedLayout = () => {
  // const { isAuthenticated } = useAuthStore();

  // if (!isAuthenticated) {
  //   return <Navigate to="/signin" replace />;
  // }

  return (
    <Suspense fallback={<div className="w-screen h-screen alignmentLogo">Any Image Here</div>}>
      <ScrollToTop />
      <AppLayout />
    </Suspense>
  );
};

const ErrorLayout = () => {
  return (
    <Suspense fallback={<div className="w-screen h-screen alignmentLogo">Any Image Here</div>}>
      <Outlet />
    </Suspense>
  );
};

export const protectedRoutes = [
  {
    path: "/",
    element: <ProtectedLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/profile", element: <UserProfiles /> },
      { path: "/admin-list", element: <UserList /> },
      { path: "/add-user", element: <AddUsers /> },
      { path: "/edit-user/:id", element: <AddUsers /> },
      // ================== Current Routes ======================
      { path: "/coupon-list", element: <CouponsList /> },
      { path: "/add-coupon", element: <AddCoupons /> },
      { path: "/edit-coupon/:id", element: <AddCoupons /> },
      { path: "/category-list", element: <CategoryList /> },
      { path: "/add-category", element: <AddCategory /> },
      { path: "/edit-category/:id", element: <AddCategory /> },
      { path: "/version-list", element: <VersionList /> },
      { path: "/add-version", element: <AddVersion /> },
      { path: "/edit-version/:id", element: <AddVersion /> },
      { path: "/user-list", element: <UserList /> },
      { path: "/device-list", element: <DeviceList /> },
      // ================= Not in use ======================
      { path: "/calendar", element: <Calendar /> },
      { path: "/blank", element: <Blank /> },
      { path: "/form-elements", element: <FormElements /> },
      { path: "/basic-tables", element: <BasicTables /> },
      { path: "/alerts", element: <Alerts /> },
      { path: "/avatars", element: <Avatars /> },
      { path: "/badge", element: <Badges /> },
      { path: "/buttons", element: <Buttons /> },
      { path: "/images", element: <Images /> },
      { path: "/videos", element: <Videos /> },
      { path: "/line-chart", element: <LineChart /> },
      { path: "/bar-chart", element: <BarChart /> },
    ],
  },
  {
    path: "/",
    element: <ErrorLayout />,
    children: [
      { path: "/not-found", element: <NotFound /> },
      { path: "/error", element: <ErrorPage /> },
      { path: "*", element: <Navigate to="/not-found" /> },
    ],
  },
];
