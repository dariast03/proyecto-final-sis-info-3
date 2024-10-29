import { DataTable } from "../components/table/data-table";
import { columns } from "../components/table/columns";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { useOfertas } from "../hooks/use-ofertas";
import DatatableSkeleton from "@/modules/shared/components/datatable-skeleton";
import { ContentLayout } from "@/components/layout/content-layout";

const breadcrumbItems = [
  {
    title: "Ofertas",
    link: "/ofertas",
  },
];

export default function DeparmentsPage() {
  const ofertasQuery = useOfertas();

  const isLoading = ofertasQuery.isLoading;

  if (ofertasQuery.isError) return <div>Error...</div>;

  const ofertas = ofertasQuery.data ?? [];

  return (
    <ContentLayout title="Ofertas" breadcrumbItems={breadcrumbItems}>
      <div className="flex flex-col gap-5 ">
        <div className="flex items-start justify-between">
          <Heading
            title={`Ofertas (${ofertas.length})`}
            description="Listado de ofertas."
          />
        </div>
        <Separator />

        {isLoading ? (
          <DatatableSkeleton columns={columns} />
        ) : (
          <DataTable data={ofertas} columns={columns} />
        )}
      </div>
    </ContentLayout>
  );
}
