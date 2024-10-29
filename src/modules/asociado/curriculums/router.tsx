import GeneralError from "@/modules/shared/components/general-error";
import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const CurriculumsPage = lazy(
  () => import("@/modules/asociado/curriculums/pages")
);

const router: RouteObject = {
  path: "curriculums",
  errorElement: <GeneralError />,
  children: [
    {
      path: "me",
      element: <CurriculumsPage />,
    },
  ],
};

export default router;
