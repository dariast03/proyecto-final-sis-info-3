import { DataTable } from "../components/table/data-table";
import { columns } from "../components/table/columns";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { useUsers } from "../hooks/use-users";
import DatatableSkeleton from "@/modules/shared/components/datatable-skeleton";
import { ContentLayout } from "@/components/layout/content-layout";

const breadcrumbItems = [
  {
    title: "Usuarios",
    link: "/users",
  },
];

export default function DeparmentsPage() {
  const usersQuery = useUsers();

  const isLoading = usersQuery.isLoading;

  if (usersQuery.isError) return <div>Error...</div>;

  const users = usersQuery.data ?? [];

  return (
    <ContentLayout title="Usuarios" breadcrumbItems={breadcrumbItems}>
      <div className="flex flex-col gap-5 ">
        <div className="flex items-start justify-between">
          <Heading
            title={`Usuarios (${users.length})`}
            description="Listado de usuarios."
          />
        </div>
        <Separator />

        {isLoading ? (
          <DatatableSkeleton columns={columns} />
        ) : (
          <DataTable data={users} columns={columns} />
        )}
      </div>
    </ContentLayout>
  );
}
