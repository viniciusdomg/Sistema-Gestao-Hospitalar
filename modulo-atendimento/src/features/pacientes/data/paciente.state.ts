import { Paciente } from "../domain/paciente.schema";

interface PacienteState {
    pacientes: Paciente[];
    adicionarPaciente: (paciente: Paciente) => void;
    buscarByCpfOrName(cpf?: string, nome?: string): Paciente | null;
}

export default PacienteState;