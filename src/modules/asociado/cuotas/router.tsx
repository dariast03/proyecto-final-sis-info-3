import GeneralError from "@/modules/shared/components/general-error";
import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const CuotasPage = lazy(() => import("@/modules/asociado/cuotas/pages"));
const NewCuotaPage = lazy(() => import("@/modules/asociado/cuotas/pages/new"));
const EditCuotaPage = lazy(
  () => import("@/modules/asociado/cuotas/pages/edit")
);

const router: RouteObject = {
  path: "cuotas",
  errorElement: <GeneralError />,
  children: [
    {
      path: "",
      element: <CuotasPage />,
    },
    {
      path: "create",
      element: <NewCuotaPage />,
    },
    {
      path: "edit/:id",
      element: <EditCuotaPage />,
    },
  ],
};

export default router;
