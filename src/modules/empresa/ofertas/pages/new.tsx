import { OfertaForm } from "../components/form";
import { ContentLayout } from "@/components/layout/content-layout";

const breadcrumbItems = [
  {
    title: "Ofertas",
    link: "/asociado/ofertas",
  },
  {
    title: "Nuevo",
    link: "/asociado/ofertas/create",
  },
];

export default function NewOfertaPage() {
  return (
    <ContentLayout breadcrumbItems={breadcrumbItems}>
      <div className="flex flex-col gap-5 ">
        <OfertaForm initialData={null} />
      </div>
    </ContentLayout>
  );
}
