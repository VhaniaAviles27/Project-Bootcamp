import React from "react";
import CatalogPage from "../pages/Catalog/CatalogPage";
import ResumePage from "../pages/Resume/ResumePage";
import ProfilePage from "../pages/Profile/ProfilePage";
import LoginPage from "../pages/Login/LoginPage";

interface RouteConfig {
  path: string;
  element: React.ComponentType;
}

const routesConfig: Record<string, RouteConfig> = {
  HOME: {
    path: "/home",
    element: CatalogPage,
  },
  RESUME: {
    path: "/resume",
    element: ResumePage,
  },
  PROFILE: {
    path: "/profile",
    element: ProfilePage,
  },
  LOGIN: {
    path: "/",
    element: LoginPage,
  },
};

export const RoutePaths = {
  LOGIN: routesConfig.LOGIN.path,
  HOME: routesConfig.HOME.path,
  RESUME: routesConfig.RESUME.path,
  PROFILE: routesConfig.PROFILE.path,
};

export default routesConfig;
