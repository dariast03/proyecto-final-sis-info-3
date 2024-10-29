import { UserForm } from "../components/form";
import { ContentLayout } from "@/components/layout/content-layout";

const breadcrumbItems = [
  {
    title: "Usuarios",
    link: "/admin/users",
  },
  {
    title: "Nuevo",
    link: "/admin/users/create",
  },
];

export default function NewUserPage() {
  return (
    <ContentLayout breadcrumbItems={breadcrumbItems}>
      <div className="flex flex-col gap-5 ">
        <UserForm initialData={null} />
      </div>
    </ContentLayout>
  );
}
