import { UserForm } from "../components/form";
import { useParams } from "react-router-dom";
import { useUser } from "../hooks/use-users";
import { ContentLayout } from "@/components/layout/content-layout";

const breadcrumbItems = [
  {
    title: "Departamentos",
    link: "/users",
  },
  {
    title: "Nuevo",
    link: "/users/new",
  },
];

export default function EditUserPage() {
  const { id = "" } = useParams<{ id: string }>();

  const userQuery = useUser(id);

  if (userQuery.isLoading) return <div>Loading...</div>;
  if (userQuery.isPending) return <div>Loading...</div>;
  if (userQuery.isError) return <div>Error: {userQuery.error.message}</div>;

  const user = userQuery.data;

  return (
    <ContentLayout title={user.nombre} breadcrumbItems={breadcrumbItems}>
      <div className="flex-1 space-y-4  ">
        <UserForm initialData={user} />
      </div>
    </ContentLayout>
  );
}
