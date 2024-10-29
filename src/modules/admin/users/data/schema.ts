import { z } from "zod";
import { roleSchema } from "../../roles/data/schema";

export const userSchema = z.object({
  id: z.number().int(),
  nombre: z.string().nonempty("Falta el nombre"),
  apellido: z.string().nonempty("Falta el apellido"),
  email: z.string()
    .nonempty("Falta el correo")
    .email("El formato del correo es incorrecto"),
  contrasena: z.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres.")
    .nonempty("Falta la contraseña"),
  direccion: z.string().nonempty("Falta la dirección"),
  telefono: z.string()
    .nonempty("Falta el teléfono"),
  idRol: z.number().int().nonnegative("Falta el rol"),
  rol: roleSchema.optional()
});

export type User = z.infer<typeof userSchema>;
export type UserWithoutId = Omit<User, "id">;
