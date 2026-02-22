import {z} from "zod";

export const pacienteSchema = z.object({
    id: z.string(),
    nome: z.string().min(1, "O nome é obrigatório"),
    cpf: z.string().min(11, "O CPF deve conter 11 dígitos").max(11, "O CPF deve conter 11 dígitos"),
    dataNascimento: z.string().refine((date) => {
        const parsedDate = Date.parse(date);
        return !isNaN(parsedDate);
    }, "Data de nascimento inválida"),
    sexo: z.enum(['Masculino', 'Feminino', 'Outro']),
});

export type Paciente = z.infer<typeof pacienteSchema>;