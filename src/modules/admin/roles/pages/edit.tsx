import { RoleForm } from "../components/form";
import { useParams } from "react-router-dom";
import { useRole } from "../hooks/use-roles";
import { ContentLayout } from "@/components/layout/content-layout";

const breadcrumbItems = [
  {
    title: "Departamentos",
    link: "/roles",
  },
  {
    title: "Nuevo",
    link: "/roles/new",
  },
];

export default function EditRolePage() {
  const { id = "" } = useParams<{ id: string }>();

  const roleQuery = useRole(id);

  if (roleQuery.isLoading) return <div>Loading...</div>;
  if (roleQuery.isPending) return <div>Loading...</div>;
  if (roleQuery.isError) return <div>Error: {roleQuery.error.message}</div>;

  const role = roleQuery.data;

  return (
    <ContentLayout title={role.nombre} breadcrumbItems={breadcrumbItems}>
      <div className="flex-1 space-y-4  ">
        <RoleForm initialData={role} />
      </div>
    </ContentLayout>
  );
}
