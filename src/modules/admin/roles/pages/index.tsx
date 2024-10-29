import { DataTable } from "../components/table/data-table";
import { columns } from "../components/table/columns";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { useRoles } from "../hooks/use-roles";
import DatatableSkeleton from "@/modules/shared/components/datatable-skeleton";
import { ContentLayout } from "@/components/layout/content-layout";

const breadcrumbItems = [
  {
    title: "Roles",
    link: "/roles",
  },
];

export default function DeparmentsPage() {
  const rolesQuery = useRoles();

  const isLoading = rolesQuery.isLoading;

  if (rolesQuery.isError) return <div>Error...</div>;

  const roles = rolesQuery.data ?? [];

  return (
    <ContentLayout title="Roles" breadcrumbItems={breadcrumbItems}>
      <div className="flex flex-col gap-5 ">
        <div className="flex items-start justify-between">
          <Heading
            title={`Roles (${roles.length})`}
            description="Listado de roles."
          />
        </div>
        <Separator />

        {isLoading ? (
          <DatatableSkeleton columns={columns} />
        ) : (
          <DataTable data={roles} columns={columns} />
        )}
      </div>
    </ContentLayout>
  );
}
