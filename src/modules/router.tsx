import { Navigate, Outlet, RouteObject } from "react-router-dom";
import { HomePage } from "./home";
import LoginPage from "./auth/pages/login";

import { adminRoutes } from "./admin/router";
import { asociadoRoutes } from "./asociado/router";
import { empresaRoutes } from "./empresa/router";
import { Suspense } from "react";

const baseRoutes: RouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/auth",
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
];

const RootLayout = () => {
  return (
    <Suspense fallback={<h1>HOLA MUNDO</h1>}>
      <Outlet />
    </Suspense>
  );
};

export const buildRouter = (idRol: number) => {
  if (idRol === 1) {
    return [
      {
        element: <RootLayout />,
        children: [...baseRoutes, ...adminRoutes],
      },
    ];
  }
  if (idRol === 2) {
    return [
      {
        element: <RootLayout />,
        children: [...baseRoutes, ...asociadoRoutes],
      },
    ];
  }

  if (idRol === 3) {
    return [
      {
        element: <RootLayout />,
        children: [...baseRoutes, ...empresaRoutes],
      },
    ];
  }

  return [...baseRoutes];
};
