import { Atendimento } from "../domain/atendimento.schema";

interface AtendimentoState {
    atendimentos: Atendimento[];
    isLoading: boolean;
    initialized: boolean;
    error: string | null;
    initialize: () => Promise<void>;
    adicionarAtendimento: (atendimento: Atendimento) => Promise<void>;
    buscarByPacienteId(pacienteId: string): Promise<Atendimento[]>;
}

export default AtendimentoState;
