import GeneralError from "@/modules/shared/components/general-error";
import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const EventosPage = lazy(() => import("@/modules/empresa/ofertas/pages"));
const NewEventoPage = lazy(
  () => import("@/modules/empresa/ofertas/pages/new")
);
const EditEventoPage = lazy(
  () => import("@/modules/empresa/ofertas/pages/edit")
);

const router: RouteObject = {
  path: "ofertas",
  errorElement: <GeneralError />,
  children: [
    {
      path: "",
      element: <EventosPage />,
    },
    {
      path: "create",
      element: <NewEventoPage />,
    },
    {
      path: "edit/:id",
      element: <EditEventoPage />,
    },
  ],
};

export default router;
