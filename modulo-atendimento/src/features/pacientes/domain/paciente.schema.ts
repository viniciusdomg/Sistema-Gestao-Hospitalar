import { z } from "zod";

export const pacienteSchema = z.object({
  id: z.string(),
  nome: z.string().min(1, "O nome e obrigatorio"),
  cpf: z
    .string()
    .trim()
    .regex(/^\d{11}$/, "O CPF deve conter exatamente 11 digitos numericos"),
  dataNascimento: z.string().refine((date) => {
    const parsedDate = Date.parse(date);
    return !Number.isNaN(parsedDate);
  }, "Data de nascimento invalida"),
  sexo: z.enum(["Masculino", "Feminino", "Outro"]),
});

export type Paciente = z.infer<typeof pacienteSchema>;
