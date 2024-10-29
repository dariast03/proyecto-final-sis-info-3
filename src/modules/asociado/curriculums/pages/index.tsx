import { DataTable } from "../components/table/data-table";
import { columns } from "../components/table/columns";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { useCurriculums, useMeCurriculum } from "../hooks/use-curriculums";
import DatatableSkeleton from "@/modules/shared/components/datatable-skeleton";
import { ContentLayout } from "@/components/layout/content-layout";
import { UploadCurriculum } from "../components/upload-curriculum";
import CurriculumDetails from "../components/curriculum-details";

const breadcrumbItems = [
  {
    title: "Curriculums",
    link: "/curriculums",
  },
];

export default function DeparmentsPage() {
  const curriculumsQuery = useMeCurriculum();

  const isLoading = curriculumsQuery.isLoading;

  if (curriculumsQuery.isError) return <div>Error...</div>;
  if (curriculumsQuery.isLoading) return <div>Cargando...</div>;

  const curriculum = curriculumsQuery.data;

  return (
    <>
      <div className="">
        {/*   <div className="flex items-start justify-between">
          <Heading
            title={`Curriculums (${curriculums.length})`}
            description="Listado de curriculums."
          />
        </div>
        <Separator /> */}

        {!curriculum ? (
          <UploadCurriculum />
        ) : (
          <CurriculumDetails curriculum={curriculum} />
        )}

        {/*   {isLoading ? (
          <DatatableSkeleton columns={columns} />
        ) : (
          <DataTable data={curriculums} columns={columns} />
        )} */}
      </div>
    </>
  );
}
