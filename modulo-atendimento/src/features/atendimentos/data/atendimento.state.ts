import { Atendimento } from "../domain/atendimento.schema";

interface AtendimentoState {
    atendimentos: Atendimento[];
    adicionarAtendimento: (atendimento: Atendimento) => void;
    buscarByPacienteId(pacienteId: string): Atendimento[];
}

export default AtendimentoState;