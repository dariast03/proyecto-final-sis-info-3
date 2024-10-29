import GeneralError from "@/modules/shared/components/general-error";
import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const PropuestasPage = lazy(
  () => import("@/modules/asociado/propuestas/pages")
);
const NewPropuestaPage = lazy(
  () => import("@/modules/asociado/propuestas/pages/new")
);
const EditPropuestaPage = lazy(
  () => import("@/modules/asociado/propuestas/pages/edit")
);

const router: RouteObject = {
  path: "propuestas",
  errorElement: <GeneralError />,
  children: [
    {
      path: "",
      element: <PropuestasPage />,
    },
    {
      path: "create",
      element: <NewPropuestaPage />,
    },
    {
      path: "edit/:id",
      element: <EditPropuestaPage />,
    },
  ],
};

export default router;
