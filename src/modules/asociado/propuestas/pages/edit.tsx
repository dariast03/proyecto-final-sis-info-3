import { PropuestaForm } from "../components/form";
import { useParams } from "react-router-dom";
import { usePropuesta } from "../hooks/use-propuestas";
import { ContentLayout } from "@/components/layout/content-layout";

const breadcrumbItems = [
  {
    title: "Departamentos",
    link: "/propuestas",
  },
  {
    title: "Nuevo",
    link: "/propuestas/new",
  },
];

export default function EditPropuestaPage() {
  const { id = "" } = useParams<{ id: string }>();

  const propuestaQuery = usePropuesta(id);

  if (propuestaQuery.isLoading) return <div>Loading...</div>;
  if (propuestaQuery.isPending) return <div>Loading...</div>;
  if (propuestaQuery.isError)
    return <div>Error: {propuestaQuery.error.message}</div>;

  const propuesta = propuestaQuery.data;

  return (
    <ContentLayout
      title={propuesta.id.toString()}
      breadcrumbItems={breadcrumbItems}
    >
      <div className="flex-1 space-y-4  ">
        <PropuestaForm initialData={propuesta} />
      </div>
    </ContentLayout>
  );
}
