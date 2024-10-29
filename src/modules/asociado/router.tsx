import { RouteObject } from "react-router-dom";
import DashboardPage from "./dashboard/pages";
import AdminLayout from "./layout";

import cuotaRouter from "./cuotas/router";
import eventoRouter from "./eventos/router";
import curricumulRouter from "./curriculums/router";
import propuestaRouter from "./propuestas/router";

export const asociadoRoutes: RouteObject[] = [
  {
    path: "/asociado",
    element: <AdminLayout />,
    children: [
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      cuotaRouter,
      eventoRouter,
      curricumulRouter,
      propuestaRouter,
    ],
  },
];
