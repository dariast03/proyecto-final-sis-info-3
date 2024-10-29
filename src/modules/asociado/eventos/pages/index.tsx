import { DataTable } from "../components/table/data-table";
import { columns } from "../components/table/columns";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { useEventos } from "../hooks/use-eventos";
import DatatableSkeleton from "@/modules/shared/components/datatable-skeleton";
import { ContentLayout } from "@/components/layout/content-layout";

const breadcrumbItems = [
  {
    title: "Eventos",
    link: "/eventos",
  },
];

export default function DeparmentsPage() {
  const eventosQuery = useEventos();

  const isLoading = eventosQuery.isLoading;

  if (eventosQuery.isError) return <div>Error...</div>;

  const eventos = eventosQuery.data ?? [];

  return (
    <ContentLayout title="Eventos" breadcrumbItems={breadcrumbItems}>
      <div className="flex flex-col gap-5 ">
        <div className="flex items-start justify-between">
          <Heading
            title={`Eventos (${eventos.length})`}
            description="Listado de eventos."
          />
        </div>
        <Separator />

        {isLoading ? (
          <DatatableSkeleton columns={columns} />
        ) : (
          <DataTable data={eventos} columns={columns} />
        )}
      </div>
    </ContentLayout>
  );
}
