import { OfertaForm } from "../components/form";
import { useParams } from "react-router-dom";
import { useOferta } from "../hooks/use-ofertas";
import { ContentLayout } from "@/components/layout/content-layout";

const breadcrumbItems = [
  {
    title: "Ofertas",
    link: "/asociado/ofertas",
  },
  {
    title: "Nuevo",
    link: "/asociado/ofertas/new",
  },
];

export default function EditOfertaPage() {
  const { id = "" } = useParams<{ id: string }>();

  const ofertaQuery = useOferta(id);

  if (ofertaQuery.isLoading) return <div>Loading...</div>;
  if (ofertaQuery.isPending) return <div>Loading...</div>;
  if (ofertaQuery.isError) return <div>Error: {ofertaQuery.error.message}</div>;

  const oferta = ofertaQuery.data;

  return (
    <ContentLayout title={oferta.titulo} breadcrumbItems={breadcrumbItems}>
      <div className="flex-1 space-y-4  ">
        <OfertaForm initialData={oferta} />
      </div>
    </ContentLayout>
  );
}
