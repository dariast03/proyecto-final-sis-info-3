import GeneralError from "@/modules/shared/components/general-error";
import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const UsersPage = lazy(() => import("@/modules/admin/users/pages"));
const NewUserPage = lazy(() => import("@/modules/admin/users/pages/new"));
const EditUserPage = lazy(() => import("@/modules/admin/users/pages/edit"));

const router: RouteObject = {
  path: "users",
  errorElement: <GeneralError />,
  children: [
    {
      path: "",
      element: <UsersPage />,
    },
    {
      path: "create",
      element: <NewUserPage />,
    },
    {
      path: "edit/:id",
      element: <EditUserPage />,
    },
  ],
};

export default router;
