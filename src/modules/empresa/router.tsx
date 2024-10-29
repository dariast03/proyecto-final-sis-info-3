import { RouteObject } from "react-router-dom";
import DashboardPage from "./dashboard/pages";
import AdminLayout from "./layout";

import ofertaRouter from "./ofertas/router";

export const empresaRoutes: RouteObject[] = [
  {
    path: "/empresa",
    element: <AdminLayout />,
    children: [
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      ofertaRouter,
    ],
  },
];
