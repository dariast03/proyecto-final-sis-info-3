import { EventoForm } from "../components/form";
import { ContentLayout } from "@/components/layout/content-layout";

const breadcrumbItems = [
  {
    title: "Eventos",
    link: "/asociado/eventos",
  },
  {
    title: "Nuevo",
    link: "/asociado/eventos/create",
  },
];

export default function NewEventoPage() {
  return (
    <ContentLayout breadcrumbItems={breadcrumbItems}>
      <div className="flex flex-col gap-5 ">
        <EventoForm initialData={null} />
      </div>
    </ContentLayout>
  );
}
