import { DataTable } from "../components/table/data-table";
import { columns } from "../components/table/columns";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { usePropuestas } from "../hooks/use-propuestas";
import DatatableSkeleton from "@/modules/shared/components/datatable-skeleton";
import { ContentLayout } from "@/components/layout/content-layout";

const breadcrumbItems = [
  {
    title: "Propuestas",
    link: "/propuestas",
  },
];

export default function DeparmentsPage() {
  const propuestasQuery = usePropuestas();

  const isLoading = propuestasQuery.isLoading;

  if (propuestasQuery.isError) return <div>Error...</div>;

  const propuestas = propuestasQuery.data ?? [];

  return (
    <ContentLayout title="Propuestas" breadcrumbItems={breadcrumbItems}>
      <div className="flex flex-col gap-5 ">
        <div className="flex items-start justify-between">
          <Heading
            title={`Propuestas (${propuestas.length})`}
            description="Listado de propuestas."
          />
        </div>
        <Separator />

        {isLoading ? (
          <DatatableSkeleton columns={columns} />
        ) : (
          <DataTable data={propuestas} columns={columns} />
        )}
      </div>
    </ContentLayout>
  );
}
