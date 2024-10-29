import { userSchema } from "@/modules/admin/users/data/schema";
import { z } from "zod";
/* 
[
    {
        "id": 1,
        "idUsuario": 1,
        "usuario": null,
        "monto": 150.75,
        "fechaPago": "2024-10-25T04:37:56.663",
        "estado": "Completado"
    }
]
*/
export const curriculumSchema = z.object({
  id: z.number().int(),
  idUsuario: z.number().int().default(0),
  usuario: userSchema.optional().nullable(),
  archivo: z.string(),
  fechaSubida: z.date().default(new Date()),
});

export type Curriculum = z.infer<typeof curriculumSchema>;
export type CurriculumWithoutId = Omit<Curriculum, "id">;
