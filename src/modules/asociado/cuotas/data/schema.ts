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
export const cuotaSchema = z.object({
  id: z.number().int(),
  idUsuario: z.number().int().default(0),
  usuario: userSchema.optional().nullable(),
  monto: z.number(),
  fechaPago: z.date(),
  estado: z.string().default("Pendiente"),
});

export type Cuota = z.infer<typeof cuotaSchema>;
export type CuotaWithoutId = Omit<Cuota, "id">;
