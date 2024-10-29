import { RouteObject } from "react-router-dom";
import DashboardPage from "./dashboard/pages";
import AdminLayout from "./layout";

import userRouter from "./users/router";
import roleRouter from "./roles/router";

export const adminRoutes: RouteObject[] = [
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      userRouter,
      roleRouter,
    ],
  },
];
