import {z} from "zod";

export const atendimentoSchema = z.object({
    id: z.string(),
    pacienteId: z.string(),
    tipo: z.enum(['Ambulatorial', 'Internação', 'Pronto Socorro']),
    status: z.enum(['Aguardando', 'Em Andamento', 'Finalizado']),
    dataHora: z.string().refine((date) => {
        const parsedDate = Date.parse(date);
        return !isNaN(parsedDate);
    }, "Data e hora inválida"),

    nivelUrgencia: z.enum(['Vermelho', 'Laranja', 'Amarelo', 'Verde', 'Azul']).optional(),
    queixaPrincipal: z.string().optional(),

    leito: z.string().optional(),
    setorInternacao: z.string().optional(), 
}).refine((data) => {
    if (data.tipo === 'Pronto Socorro') {
        return data.nivelUrgencia && data.queixaPrincipal;
    }
    if (data.tipo === 'Internação') {
        return data.leito && data.setorInternacao;
    }
    return true;
}, "Campos obrigatórios não preenchidos de acordo com o tipo do atendimento");

export type Atendimento = z.infer<typeof atendimentoSchema>;