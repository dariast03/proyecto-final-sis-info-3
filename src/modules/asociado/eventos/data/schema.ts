import { userSchema } from "@/modules/admin/users/data/schema";
import { z } from "zod";

export const eventoSchema = z.object({
  id: z.number().int(),
  idUsuario: z.number().int().default(0),
  usuario: userSchema.optional().nullable(),
  titulo: z.string(),
  descripcion: z.string(),
  fechaEvento: z.date(),
  lugar: z.string(),
});

export type Evento = z.infer<typeof eventoSchema>;
export type EventoWithoutId = Omit<Evento, "id">;
