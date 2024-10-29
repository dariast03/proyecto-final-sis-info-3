import { CuotaForm } from "../components/form";
import { ContentLayout } from "@/components/layout/content-layout";

const breadcrumbItems = [
  {
    title: "Usuarios",
    link: "/admin/cuotas",
  },
  {
    title: "Nuevo",
    link: "/admin/cuotas/create",
  },
];

export default function NewCuotaPage() {
  return (
    <ContentLayout breadcrumbItems={breadcrumbItems}>
      <div className="flex flex-col gap-5 ">
        <CuotaForm initialData={null} />
      </div>
    </ContentLayout>
  );
}
