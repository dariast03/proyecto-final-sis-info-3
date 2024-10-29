import GeneralError from "@/modules/shared/components/general-error";
import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const RolesPage = lazy(() => import("@/modules/admin/roles/pages"));
const NewRolePage = lazy(() => import("@/modules/admin/roles/pages/new"));
const EditRolePage = lazy(() => import("@/modules/admin/roles/pages/edit"));

const router: RouteObject = {
  path: "roles",
  errorElement: <GeneralError />,
  children: [
    {
      path: "",
      element: <RolesPage />,
    },
    {
      path: "create",
      element: <NewRolePage />,
    },
    {
      path: "edit/:id",
      element: <EditRolePage />,
    },
  ],
};

export default router;
