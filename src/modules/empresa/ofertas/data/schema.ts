import { userSchema } from "@/modules/admin/users/data/schema";
import { z } from "zod";

export const ofertaSchema = z.object({
  id: z.number().int(),
  idUsuario: z.number().int().default(0),
  usuario: userSchema.optional().nullable(),
  empresa: z.string(),
  descripcion: z.string(),
  fechaPublicacion: z.date().default(new Date()),
  fechaVencimiento: z.date(),
});

export type Oferta = z.infer<typeof ofertaSchema>;
export type OfertaWithoutId = Omit<Oferta, "id">;
