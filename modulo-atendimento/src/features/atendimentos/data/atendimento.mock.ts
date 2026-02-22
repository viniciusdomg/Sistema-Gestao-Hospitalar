import { Atendimento } from "../domain/atendimento.schema";

export const atendimentosMock: Atendimento[] = [
    {
        id: "a1b2c3d4-e5f6-7890-abcd-1234567890ab",
        pacienteId: "123e4567-e89b-12d3-a456-426614174000", // ID do João
        tipo: "Pronto Socorro",
        status: "Aguardando",
        dataHora: new Date().toISOString(), // Hoje
        nivelUrgencia: "Amarelo", // Obrigatório para Pronto Socorro
        queixaPrincipal: "Forte dor no peito e falta de ar moderada."
    },
    {
        id: "f1e2d3c4-b5a6-0987-dcba-0987654321fe",
        pacienteId: "987fcdeb-51a2-43d7-9012-3456789abcde", // ID da Maria
        tipo: "Internação",
        status: "Em Andamento",
        dataHora: new Date(Date.now() - 86400000).toISOString(), // Ontem
        leito: "Leito 402", // Obrigatório para Internação
        setorInternacao: "Cardiologia"
    },
    {
        id: "11223344-5566-7788-9900-aabbccddeeff",
        pacienteId: "123e4567-e89b-12d3-a456-426614174000", // ID do João (Atendimento antigo)
        tipo: "Ambulatorial",
        status: "Finalizado",
        dataHora: new Date(Date.now() - 604800000).toISOString(), // Semana passada
    }
];