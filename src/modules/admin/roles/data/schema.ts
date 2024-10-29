import { z } from "zod";

export const roleSchema = z.object({
  id: z.number().int(),
  nombre: z.string().min(1, 'El nombre es requerido'),
});

export type Role = z.infer<typeof roleSchema>;
export type RoleWithoutId = Omit<Role, "id">;
