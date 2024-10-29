import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Clock, BookOpen } from "lucide-react";
import { Curriculum } from "../data/schema";
import { useCurriculumDelete } from "../hooks/use-curriculum-mutations";
import { Button } from "@/components/ui/button";

interface CurriculumCardProps {
  curriculum: Curriculum;
}

export default function CurriculumDetails({ curriculum }: CurriculumCardProps) {
  const name = "Dante Arias Tarifa";

  const curriculumDeleteMutation = useCurriculumDelete();

  return (
    <Card className="w-full ">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Mi curriculum</CardTitle>
        <CardDescription>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti unde
          hic adipisci eum libero,{" "}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 mb-4">
          <Avatar>
            <AvatarImage src={"#"} />
            <AvatarFallback>
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">Asociado</p>
            <p className="text-sm text-muted-foreground">{name}</p>
          </div>
        </div>

        <div className="space-x-4 ">
          <p className="font-medium">Archivo</p>
          <p>{curriculum.archivo}</p>
        </div>
        <div>
          <p className="font-medium">Cargado en</p>
          <p>{curriculum.fechaSubida.toLocaleDateString()}</p>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          variant={"destructive"}
          onClick={() => curriculumDeleteMutation.mutate(curriculum.id)}
        >
          Eliminar
        </Button>
      </CardFooter>
    </Card>
  );
}
