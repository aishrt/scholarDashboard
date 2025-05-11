import { Navigate, RouteObject, useRoutes } from "react-router-dom";
import storage from "../utils/storage";
import { protectedRoutes } from "./Protected";
import { publicRoutes } from "./Public";
import NotFound from "../pages/OtherPage/NotFound";

export const AppRoutes = () => {
  const token = storage.getToken();
  console.log("token", token);

  const commonRoutes = [
    { path: "/", element: <NotFound /> },
    { path: "*", element: <Navigate to="/" /> },
  ]; // These are routes which are accessible  , with or without token

  let allRoutes: RouteObject[] = [...commonRoutes];

  if (!token) {
    console.log("Token is present");

    allRoutes = [...protectedRoutes];
  } else {
    console.log("Token is not present");
    allRoutes = [...publicRoutes];
  }

  allRoutes = [...allRoutes, ...commonRoutes];
  const element = useRoutes(allRoutes);

  return <>{element}</>;
};
