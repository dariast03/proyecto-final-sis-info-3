import { RoleForm } from "../components/form";
import { ContentLayout } from "@/components/layout/content-layout";

const breadcrumbItems = [
  {
    title: "Usuarios",
    link: "/admin/roles",
  },
  {
    title: "Nuevo",
    link: "/admin/roles/create",
  },
];

export default function NewRolePage() {
  return (
    <ContentLayout breadcrumbItems={breadcrumbItems}>
      <div className="flex flex-col gap-5 ">
        <RoleForm initialData={null} />
      </div>
    </ContentLayout>
  );
}
