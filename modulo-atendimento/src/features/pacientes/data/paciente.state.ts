import { Paciente } from "../domain/paciente.schema";

interface PacienteState {
    pacientes: Paciente[];
    isLoading: boolean;
    initialized: boolean;
    error: string | null;
    initialize: () => Promise<void>;
    adicionarPaciente: (paciente: Paciente) => Promise<void>;
    buscarByCpfOrName(cpf?: string, nome?: string): Promise<Paciente | null>;
}

export default PacienteState;
