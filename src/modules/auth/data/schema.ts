import { User } from "@/modules/admin/users/data/schema";
import z from "zod";

export type AuthProvider = "google.com" | "microsoft.com";

export type UserAuth = {
  token: string;
  usuario: User
};

export type LoginResponse = {
  status: boolean;
  user: UserAuth;
};

export const loginFormSchema = z.object({
  correo: z
    .string()
    .email({ message: "Dirección de correo electrónico inválida" }),
  contrasena: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export const forgotPasswordFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Por favor, ingresa tu correo electrónico" })
    .email({ message: "Dirección de correo electrónico inválida" }),
});

export const signInLinkFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Por favor, ingresa tu correo electrónico" })
    .email({ message: "Dirección de correo electrónico inválida" }),
});

const MIN_LENGTH = 6;
const FIELD_VALIDATION = {
  TEST: {
    SPECIAL_CHAR: (value: string) =>
      // eslint-disable-next-line no-useless-escape
      /[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/.test(value),
    LOWERCASE: (value: string) => /[a-z]/.test(value),
    UPPERCASE: (value: string) => /[A-Z]/.test(value),
    NUMBER: (value: string) => /.*[0-9].*/.test(value),
  },
  MSG: {
    MIN_LEN: `Password must have ${MIN_LENGTH} characters`,
    SPECIAL_CHAR: "Password must contain atleast one special character",
    LOWERCASE: "Password must contain at least one lowercase letter",
    UPPERCASE: "Password must contain at least one uppercase letter",
    NUMBER: "Password must contain at least one number",
    MATCH: "Password must match",
  },
};

const patterns = z
  .string()
  .min(MIN_LENGTH, {
    message: FIELD_VALIDATION.MSG.MIN_LEN,
  })
  .refine(FIELD_VALIDATION.TEST.SPECIAL_CHAR, FIELD_VALIDATION.MSG.SPECIAL_CHAR)
  .refine(FIELD_VALIDATION.TEST.LOWERCASE, FIELD_VALIDATION.MSG.LOWERCASE)
  .refine(FIELD_VALIDATION.TEST.UPPERCASE, FIELD_VALIDATION.MSG.UPPERCASE)
  .refine(FIELD_VALIDATION.TEST.NUMBER, FIELD_VALIDATION.MSG.NUMBER);

export const resetPasswordFormSchema = z
  .object({
    password: patterns,
    confirmPassword: patterns,
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      addFieldIssue("confirmPassword", ctx);
    }
  });

const addFieldIssue = (field: string, ctx: z.RefinementCtx) => {
  ctx.addIssue({
    code: "custom",
    message: FIELD_VALIDATION.MSG.MATCH,
    path: [field],
    fatal: true,
  });
};

export type LoginForm = z.infer<typeof loginFormSchema>;
export type ForgotPasswordForm = z.infer<typeof forgotPasswordFormSchema>;
export type SignInLinkForm = z.infer<typeof signInLinkFormSchema>;
export type ResetPasswordForm = z.infer<typeof resetPasswordFormSchema>;
