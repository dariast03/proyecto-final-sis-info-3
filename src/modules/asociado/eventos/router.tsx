import GeneralError from "@/modules/shared/components/general-error";
import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const EventosPage = lazy(() => import("@/modules/asociado/eventos/pages"));
const NewEventoPage = lazy(
  () => import("@/modules/asociado/eventos/pages/new")
);
const EditEventoPage = lazy(
  () => import("@/modules/asociado/eventos/pages/edit")
);

const router: RouteObject = {
  path: "eventos",
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
