import { EventoForm } from "../components/form";
import { useParams } from "react-router-dom";
import { useEvento } from "../hooks/use-eventos";
import { ContentLayout } from "@/components/layout/content-layout";

const breadcrumbItems = [
  {
    title: "Eventos",
    link: "/asociado/eventos",
  },
  {
    title: "Nuevo",
    link: "/asociado/eventos/new",
  },
];

export default function EditEventoPage() {
  const { id = "" } = useParams<{ id: string }>();

  const eventoQuery = useEvento(id);

  if (eventoQuery.isLoading) return <div>Loading...</div>;
  if (eventoQuery.isPending) return <div>Loading...</div>;
  if (eventoQuery.isError) return <div>Error: {eventoQuery.error.message}</div>;

  const evento = eventoQuery.data;

  return (
    <ContentLayout title={evento.titulo} breadcrumbItems={breadcrumbItems}>
      <div className="flex-1 space-y-4  ">
        <EventoForm initialData={evento} />
      </div>
    </ContentLayout>
  );
}
