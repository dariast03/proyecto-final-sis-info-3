import { DataTable } from "../components/table/data-table";
import { columns } from "../components/table/columns";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { useCuotas } from "../hooks/use-cuotas";
import DatatableSkeleton from "@/modules/shared/components/datatable-skeleton";
import { ContentLayout } from "@/components/layout/content-layout";

const breadcrumbItems = [
  {
    title: "Cuotas",
    link: "/cuotas",
  },
];

export default function DeparmentsPage() {
  const cuotasQuery = useCuotas();

  const isLoading = cuotasQuery.isLoading;

  if (cuotasQuery.isError) return <div>Error...</div>;

  const cuotas = cuotasQuery.data ?? [];

  return (
    <ContentLayout title="Cuotas" breadcrumbItems={breadcrumbItems}>
      <div className="flex flex-col gap-5 ">
        <div className="flex items-start justify-between">
          <Heading
            title={`Cuotas (${cuotas.length})`}
            description="Listado de cuotas."
          />
        </div>
        <Separator />

        {isLoading ? (
          <DatatableSkeleton columns={columns} />
        ) : (
          <DataTable data={cuotas} columns={columns} />
        )}
      </div>
    </ContentLayout>
  );
}
