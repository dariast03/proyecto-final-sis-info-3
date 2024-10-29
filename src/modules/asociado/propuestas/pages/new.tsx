import { PropuestaForm } from "../components/form";
import { ContentLayout } from "@/components/layout/content-layout";

const breadcrumbItems = [
  {
    title: "Usuarios",
    link: "/admin/propuestas",
  },
  {
    title: "Nuevo",
    link: "/admin/propuestas/create",
  },
];

export default function NewPropuestaPage() {
  return (
    <ContentLayout breadcrumbItems={breadcrumbItems}>
      <div className="flex flex-col gap-5 ">
        <PropuestaForm initialData={null} />
      </div>
    </ContentLayout>
  );
}
