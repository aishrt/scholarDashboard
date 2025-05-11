import { Navigate, Outlet, Route } from "react-router-dom";
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
import AddUsers from "../pages/AdminPages/AddUsers";
import DealsList from "../pages/AdminPages/DealsList";
import TrucksList from "../pages/AdminPages/TrucksList";
import TransactionsList from "../pages/AdminPages/TransactionsList";
import CompaniesList from "../pages/AdminPages/CompanyList";
import CompanyList from "../pages/AdminPages/CompanyList";
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
      { path: "/user-list", element: <UserList /> },
      { path: "/admin-list", element: <UserList /> },
      { path: "/organisation-list", element: <CompanyList /> },
      { path: "/deals-list", element: <DealsList /> },
      { path: "/trucks-list", element: <TrucksList /> },
      { path: "/transactions-list", element: <TransactionsList /> },
      { path: "/add-user", element: <AddUsers /> },
      { path: "/edit-user/:id", element: <AddUsers /> },
      { path: "/edit-company/:id", element: <AddUsers /> },
      // =======================================
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
