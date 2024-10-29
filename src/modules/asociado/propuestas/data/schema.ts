import { userSchema } from "@/modules/admin/users/data/schema";
import { ofertaSchema } from "@/modules/empresa/ofertas/data/schema";
import { z } from "zod";

export const propuestaSchema = z.object({
  id: z.number().int(),
  idUsuario: z.number().int().default(0),
  usuario: userSchema.optional().nullable(),
  idOferta: z.number().int(),
  oferta: ofertaSchema.optional().nullable(),
  fechaPropuesta: z.date().default(new Date()),
  estado: z.string().default("Pendiente"),
});

export type Propuesta = z.infer<typeof propuestaSchema>;
export type PropuestaWithoutId = Omit<Propuesta, "id">;
