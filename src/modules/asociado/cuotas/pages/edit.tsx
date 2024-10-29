import { CuotaForm } from "../components/form";
import { useParams } from "react-router-dom";
import { useCuota } from "../hooks/use-cuotas";
import { ContentLayout } from "@/components/layout/content-layout";

const breadcrumbItems = [
  {
    title: "Departamentos",
    link: "/cuotas",
  },
  {
    title: "Nuevo",
    link: "/cuotas/new",
  },
];

export default function EditCuotaPage() {
  const { id = "" } = useParams<{ id: string }>();

  const cuotaQuery = useCuota(id);

  if (cuotaQuery.isLoading) return <div>Loading...</div>;
  if (cuotaQuery.isPending) return <div>Loading...</div>;
  if (cuotaQuery.isError) return <div>Error: {cuotaQuery.error.message}</div>;

  const cuota = cuotaQuery.data;

  return (
    <ContentLayout title={cuota.nombre} breadcrumbItems={breadcrumbItems}>
      <div className="flex-1 space-y-4  ">
        <CuotaForm initialData={cuota} />
      </div>
    </ContentLayout>
  );
}
